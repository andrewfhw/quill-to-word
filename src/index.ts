import { ParsedQuillDelta, Paragraph as QParagraph, TextRun as QTextRun, parseQuillDelta, RawQuillDelta, QHyperLink } from 'quilljs-parser';
import * as docx from 'docx';
import { AlignmentType, HyperlinkRef, HyperlinkType, Media, Packer, Paragraph, TextRun, UnderlineType } from 'docx';
import { customLevels, defaultStyles } from './default-styles';

interface DocxConfig {
  styles: {
    paragraphStyles: any
  };
  numbering: { config: object[] } | undefined;
  hyperlinks: object | undefined;
}

let linkTracker = 0;
let numberedTracker = 0;

// sets up the docx document
function setupDoc(parsedDelta: ParsedQuillDelta): DocxConfig  {
  let hyperlinks;
  let numbering;
  // build the hyperlinks property
  if (parsedDelta.setup.hyperlinks.length > 0) {
    hyperlinks = buildHyperlinks(parsedDelta.setup.hyperlinks);
  };
  // build the numbering property
  if (parsedDelta.setup.numberedLists > 0) {
    numbering = buildNumbering(parsedDelta.setup.numberedLists);
  }
  const config: DocxConfig = {
    styles: {
      paragraphStyles: defaultStyles
    },
    numbering: numbering ? numbering : undefined,
    hyperlinks: hyperlinks ? hyperlinks : undefined
  };
  console.log('docConfig', config);
  return config;
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
  let hyperlinks: object = {};
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

// main function to generate docx document
export async function generateWord(delta: RawQuillDelta | ParsedQuillDelta | ParsedQuillDelta[]): Promise<Blob> {
  linkTracker = 0;
  numberedTracker = 0;
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
  let docConfig = setupDoc(parsedDeltas[0]);
  doc = new docx.Document(docConfig as any);
  // build docx sections
  for (const delta of parsedDeltas) {
    // build sections
    sections.push(buildSection(delta.paragraphs, doc));
  };
  // add docx sections to doc
  for (const section of sections) {
    doc.addSection({
        children: section
    });
  };
  // create the blob
  const blob = await Packer.toBlob(doc);
  return blob;
}

// generate a section as an array of paragraphs
function buildSection(quillParagraphs: QParagraph[], doc: docx.Document): Paragraph[] {
  // create a container to hold the docx paragraphs
  const paragraphs: Paragraph[] = [];
  // build a docx paragraph from each delta paragraph
  for (const paragraph of quillParagraphs) {
      // if embed video or image
      if (paragraph.embed?.image) {
        const image = Media.addImage(doc, paragraph.embed.image);
        paragraphs.push(new Paragraph(image));
      } else if (paragraph.embed?.video) {
        // handle video embed **
      // if text runs
      } else if (paragraph.textRuns) {
          paragraphs.push(new Paragraph({
              children: buildParagraph(paragraph),
              heading: paragraph.attributes?.header === 1 ? docx.HeadingLevel.HEADING_1 : paragraph.attributes?.header === 2 ? docx.HeadingLevel.HEADING_2 : undefined,
              bullet: paragraph.attributes?.list === 'bullet' ? { level: paragraph.attributes.indent ? paragraph.attributes.indent : 0 } : undefined,
              numbering: paragraph.attributes?.list === 'ordered' ? { reference: `numbered_${numberedTracker}`, level: paragraph.attributes.indent ? paragraph.attributes.indent : 0 } : undefined,
              alignment: paragraph.attributes?.align === 'left' ? AlignmentType.LEFT : paragraph.attributes?.align === 'center' ? AlignmentType.CENTER : paragraph.attributes?.align === 'right' ? AlignmentType.RIGHT : paragraph.attributes?.align === 'justify' ? AlignmentType.JUSTIFIED : undefined,
              // direction
              // indent
              // blockquote
              // code block
          }));
          if (paragraph.attributes?.list === 'ordered') {
            numberedTracker++;
          }
      }
  };
  return paragraphs;
}

// generate a paragraph as an array of text runs
function buildParagraph(paragraph: QParagraph): (TextRun | HyperlinkRef)[] {
  // container to hold docx text runs
  const textRuns: (TextRun | HyperlinkRef)[] = [];
  // build a docx run from each delta run
  for (const run of paragraph.textRuns!) {
      // if formula
      if ((run as {formula: string}).formula) {
        // handle formulas **
      // if text
      } else if ((run as QTextRun).text) {
          textRuns.push(buildTextRun(run as QTextRun));
      }
  };
  return textRuns;
}

// generate a docx text run from quill text run
function buildTextRun(run: QTextRun): TextRun | HyperlinkRef {
  let textRun: TextRun | HyperlinkRef;
  if (run.attributes?.link) {
    // handle link **
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
      underline: run.attributes?.underline ? { type: UnderlineType.SINGLE, color: undefined } : undefined,
      color: run.attributes?.color ? run.attributes?.color.slice(1) : undefined,
      // size
      // font
      // background color
      // link
  });
  }
  return textRun;
}

// build a formula
function buildFormula(formula: string) {

}

// build a video
function buildVideo(video: string) {

}
