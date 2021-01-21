import { ParsedQuillDelta, Paragraph as QParagraph, TextRun as QTextRun, parseQuillDelta, RawQuillDelta, QHyperLink } from 'quilljs-parser';
import * as docx from 'docx';
import { AlignmentType, HyperlinkRef, HyperlinkType, Media, Packer, Paragraph, TextRun, UnderlineType } from 'docx';
import { customLevels, defaultStyles } from './default-styles';
import { Config, ExportObject, StyleConfig, StyleProperties } from './interfaces';


let linkTracker = 0;
let numberedTracker = -1;
let styles = defaultStyles;

// main public function to generate docx document
export async function generateWord(delta: RawQuillDelta | ParsedQuillDelta | ParsedQuillDelta[], config?: Config): Promise<ExportObject> {
  linkTracker = 0; // reset link tracker
  numberedTracker = -1; // reset numered list tracker
  let doc: docx.Document;
  // create a container for the docx doc sections
  const sections: Paragraph[][] = [];
  // create a container for the parsed Quill deltas
  const parsedDeltas: ParsedQuillDelta[] = [];
  // if input is a raw quill delta
  if ((delta as RawQuillDelta).ops) {
    const parsedDelta = parseQuillDelta(delta as RawQuillDelta);
    parsedDeltas.push(parsedDelta);
  // if input is an array of parsed quill deltas
  } else if (Array.isArray(delta)) {
    for (const eachDelta of delta) {
      parsedDeltas.push(eachDelta);
    };
  // if input is a single parsed quill delta
  } else if ((delta as ParsedQuillDelta).paragraphs) {
    parsedDeltas.push(delta as ParsedQuillDelta);
  // if input is not recognized
  } else {
    throw new Error('Please provide a raw Quill Delta, a parsed Quill delta, or an Array of parsed Quill deltas. See QuillTodocx readme.');
  }
  // set up the docx document based on configuration
  doc = setupDoc(parsedDeltas[0], config);
  // build docx sections
  for (const delta of parsedDeltas) {
    sections.push(buildSection(delta.paragraphs, doc));
  };
  // add docx sections to doc
  for (const section of sections) {
    doc.addSection({
        children: section
    });
  };
  // return the appropriate export object based on configuration
  return exportDoc(doc, config);
}

// set a style's paragraph and run properties
function setStyle(style: StyleProperties, styleId: string, index: number) {
  if (style.paragraph) {
    styles[index].paragraph = style.paragraph as any;
  }
  if (style.run) {
    styles[index].run = style.run as any;
  }
}

// apply custom paragraph styles from the user
function setParagraphsStyles(paragraphStyles: StyleConfig) {
  if (paragraphStyles.normal) {
    const index = styles.findIndex(style => style.id === 'normal');
    setStyle(paragraphStyles.normal, 'normal', index);
  }
  if (paragraphStyles.header_1) {
    const index = styles.findIndex(style => style.id === 'header_1');
    setStyle(paragraphStyles.header_1, 'header_1', index);
  }
  if (paragraphStyles.header_2) {
    const index = styles.findIndex(style => style.id === 'header_2');
    setStyle(paragraphStyles.header_2, 'header_2', index);
  }
  if (paragraphStyles.list_paragraph) {
    const index = styles.findIndex(style => style.id === 'list_paragraph');
    setStyle(paragraphStyles.list_paragraph, 'list_paragraph', index);
  }
  if (paragraphStyles.code_block) {
    const index = styles.findIndex(style => style.id === 'code_block');
    setStyle(paragraphStyles.code_block, 'code_block', index);
  }
  if (paragraphStyles.block_quote) {
    const index = styles.findIndex(style => style.id === 'block_quote');
    setStyle(paragraphStyles.block_quote, 'block_quote', index);
  }
  if (paragraphStyles.citation) {
    const index = styles.findIndex(style => style.id === 'citation');
    setStyle(paragraphStyles.citation, 'citation', index);
  }
}

// apply custom configuration from the user
function setupConfig(config: Config) {
  if (config.paragraphStyles) {
    setParagraphsStyles(config.paragraphStyles);
  }
}

// sets up the docx document
function setupDoc(parsedDelta: ParsedQuillDelta, config?: Config): docx.Document  {
  styles = defaultStyles; // reset back to original
  if (config) {
    setupConfig(config);
  }
  let hyperlinks: any = undefined;
  let numbering: any = undefined;
  // build the hyperlinks property
  if (parsedDelta.setup.hyperlinks.length > 0) {
    hyperlinks = buildHyperlinks(parsedDelta.setup.hyperlinks);
  }
  // build the numbering property
  if (parsedDelta.setup.numberedLists > 0) {
    numbering = buildNumbering(parsedDelta.setup.numberedLists);
  }
  const doc = new docx.Document({
    styles: {
      paragraphStyles: styles
    },
    numbering: numbering,
    hyperlinks: hyperlinks
  });
  return doc;
}

// export the appropriate object based on configuration
async function exportDoc(doc: docx.Document, config?: Config): Promise<ExportObject> {
  if (!config || !config.exportAs || config.exportAs === 'doc') {
    return doc;
  }
  if (config.exportAs === 'blob') {
    return Packer.toBlob(doc);
  }
  if (config.exportAs === 'buffer') {
    console.log('returning buffer');
    return Packer.toBuffer(doc);
  }
  if (config.exportAs === 'base64') {
    return Packer.toBase64String(doc);
  }
  throw new Error('Please set exportAs configuration to blob, buffer, doc, or base64.');
}

// build docx numbering object from quill numbered lists
function buildNumbering(numberOfLists: number): { config: object[] } {
  let config: any[] = [];
  let numberTracker = 0;
  // create a new docx numbering object for each quill numbered list
  while (numberTracker < numberOfLists) {
    const newList = {
      reference: `numbered_${numberTracker}`,
      levels: customLevels
    };
    config.push(newList);
    numberTracker++;
  };
  const numberConfig = {
    config: config
  };
  return numberConfig;
}

// build a docx hyperlinks object from the quill hyperlinks
function buildHyperlinks(quillLinks: QHyperLink[]): object {
  let hyperlinks: any = {};
  let linkTracker = 0;
  // generate a new docx link object from each quill link; merge into hyperlinks object
  for (const link of quillLinks) {
    const docLink = {
      link: link.link,
      text: link.text,
      type: HyperlinkType.EXTERNAL
    };
    hyperlinks = {
      ...hyperlinks,
      [`link${linkTracker}`]: docLink
    }
    linkTracker++;
  };
  return hyperlinks;
}

// generate a section as an array of paragraphs
function buildSection(quillParagraphs: QParagraph[], doc: docx.Document): Paragraph[] {
  let quillParagraphTracker = 0;
  // create a container to hold the docx paragraphs
  const paragraphs: Paragraph[] = [];
  // build a docx paragraph from each delta paragraph
  for (const paragraph of quillParagraphs) {
      // if embed video or image
      if (paragraph.embed?.image) {
        const image = Media.addImage(doc, paragraph.embed.image);
        paragraphs.push(new Paragraph(image));
      } else if (paragraph.embed?.video) {
        const run = buildVideo(paragraph.embed.video);
        paragraphs.push(new Paragraph({ children: [run] }));
      // if text runs
      } else if (paragraph.textRuns) {
        // handle ordered list tracking
        if (quillParagraphTracker > 0 && paragraph.attributes?.list === 'ordered') {
          if (quillParagraphs[quillParagraphTracker-1].attributes?.list === 'ordered') {
            numberedTracker = numberedTracker;
          } else {
            numberedTracker++;
          }
        }
        paragraphs.push(buildParagraph(paragraph));
      }
      quillParagraphTracker++;
  };
  return paragraphs;
}

// generate a paragraph as an array of text runs
function buildParagraph(paragraph: QParagraph): Paragraph {
  // container to hold docx text runs
  const textRuns: (TextRun | HyperlinkRef)[] = [];
  // build a docx run from each delta run
  for (const run of paragraph.textRuns!) {
      // if formula
      if ((run as {formula: string}).formula) {
        textRuns.push(buildFormula((run as { formula: string }).formula));
      // if text
      } else if ((run as QTextRun).text) {
          textRuns.push(buildTextRun(run as QTextRun, paragraph));
      }
  };
  const docxParagraph = new Paragraph({
    children: textRuns,
    heading: paragraph.attributes?.header === 1 ? docx.HeadingLevel.HEADING_1 : paragraph.attributes?.header === 2 ? docx.HeadingLevel.HEADING_2 : undefined,
    bullet: paragraph.attributes?.list === 'bullet' ? { level: paragraph.attributes.indent ? paragraph.attributes.indent : 0 } : undefined,
    numbering: paragraph.attributes?.list === 'ordered' ? { reference: `numbered_${numberedTracker}`, level: paragraph.attributes.indent ? paragraph.attributes.indent : 0 } : undefined,
    alignment: paragraph.attributes?.align === 'left' ? AlignmentType.LEFT : paragraph.attributes?.align === 'center' ? AlignmentType.CENTER : paragraph.attributes?.align === 'right' ? AlignmentType.RIGHT : paragraph.attributes?.align === 'justify' ? AlignmentType.JUSTIFIED : undefined,
    style: paragraph.attributes?.['code-block'] ? 'code_block' : paragraph.attributes?.blockquote ? 'block_quote' : undefined,
    // bidirectional: paragraph.attributes?.direction === 'rtl' ? true : undefined,
    // indent
  });
  return docxParagraph;
}

// generate a docx text run from quill text run
function buildTextRun(run: QTextRun, paragraph: QParagraph): TextRun | HyperlinkRef {
  let textRun: TextRun | HyperlinkRef;
  if (run.attributes?.link) {
    textRun = new HyperlinkRef(`link${linkTracker}`);
    linkTracker++;
  } else {
    textRun = new TextRun({
      text: run.text,
      bold: run.attributes?.bold ? true : false,
      italics: run.attributes?.italic ? true : false,
      subScript: run.attributes?.script === 'sub' ? true : false,
      superScript: run.attributes?.script === 'super' ? true : false,
      strike: run.attributes?.strike ? true : false,
      underline: run.attributes?.underline ? { type: UnderlineType.SINGLE, color: 'auto' } : undefined,
      color: run.attributes?.color ? run.attributes?.color.slice(1) : undefined,
      size: run.attributes?.size === 'huge' ? 36 : run.attributes?.size === 'large' ? 32 : run.attributes?.size === 'small' ? 20 : undefined,
      // rightToLeft: paragraph.attributes?.direction === 'rtl' ? true : undefined
      // font
      highlight: run.attributes?.background ? 'yellow' : undefined
    });
  }
  return textRun;
}

// build a formula
function buildFormula(formula: string) {
  return new TextRun({
    text: formula
  });
}

// build a video
function buildVideo(video: string) {
  return new TextRun({
    text: video
  });
}
