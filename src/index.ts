import { ParsedQuillDelta, Paragraph as QParagraph, TextRun as QTextRun } from 'quilljs-parser';
import * as docx from 'docx';
import { AlignmentType, Packer, Paragraph, TextRun, UnderlineType } from 'docx';
import { saveAs } from 'file-saver'

const defaultStyles = [{

}];

 const customLevels = [{
    level: 0,
    format: 'decimal',
    text: '%1.',
    alignment: AlignmentType.LEFT,
    style: {
      paragraph: {
        indent: { left: 720, hanging: 360 }
      }
    }
  },{
    level: 1,
    format: 'lowerLetter',
    text: '%2.',
    alignment: AlignmentType.LEFT,
    style: {
      paragraph: {
        indent: { left: 1440, hanging: 360 }
      }
    }
  },{
    level: 2,
    format: 'lowerRoman',
    text: '%3.',
    alignment: AlignmentType.LEFT,
    style: {
      paragraph: {
        indent: { left: 2160, hanging: 360 }
      }
    }
  },{
    level: 3,
    format: 'decimal',
    text: '%4.',
    alignment: AlignmentType.LEFT,
    style: {
      paragraph: {
        indent: { left: 2880, hanging: 360 }
      }
    }
  },{
    level: 4,
    format: 'lowerLetter',
    text: '%5.',
    alignment: AlignmentType.LEFT,
    style: {
      paragraph: {
        indent: { left: 3600, hanging: 360 }
      }
    }
  },{
    level: 3,
    format: 'lowerRoman',
    text: '%5.',
    alignment: AlignmentType.LEFT,
    style: {
      paragraph: {
        indent: { left: 4320, hanging: 360 }
      }
    }
  }]

  const defaultNumbering = {
    config: [{
      reference: 'default-numbering',
      levels: customLevels
    }]
  }

// main function to generate Word document
export async function generateWord(delta: ParsedQuillDelta): Promise<Blob> {
    const doc = new docx.Document({
        numbering: defaultNumbering
    });
    const sections: Paragraph[][] = [];
    // if array of deltas, iterate over each delta
    if (Array.isArray(delta)) {
        for (const section of delta) {
            // build sections
            sections.push(buildSection(section.paragraphs));
        };
    // only a single delta
    } else {
        // build single section
        sections.push(buildSection(delta.paragraphs));
    }

    for (const section of sections) {
        doc.addSection({
            children: section
        });
    };

    

    // download
    const blob = await Packer.toBlob(doc);

    return blob;
}

// generate a section as an array of paragraphs
function buildSection(quillParagraphs: QParagraph[]): Paragraph[] {
    const paragraphs: Paragraph[] = [];

    for (const paragraph of quillParagraphs) {
        // if embed video or image
        if (paragraph.embed) {

        // if text runs
        } else if (paragraph.textRuns) {
            paragraphs.push(new Paragraph({
                children: buildParagraph(paragraph),
                heading: paragraph.attributes?.header === 1 ? docx.HeadingLevel.HEADING_1 : paragraph.attributes?.header === 2 ? docx.HeadingLevel.HEADING_2 : undefined,
                bullet: paragraph.attributes?.list === 'bullet' ? { level: paragraph.attributes.indent ? paragraph.attributes.indent : 0 } : undefined,
                numbering: paragraph.attributes?.list === 'ordered' ? { reference: 'default-numbering', level: paragraph.attributes.indent ? paragraph.attributes.indent : 0 } : undefined,
                alignment: paragraph.attributes?.align === 'left' ? AlignmentType.LEFT : paragraph.attributes?.align === 'center' ? AlignmentType.CENTER : paragraph.attributes?.align === 'right' ? AlignmentType.RIGHT : paragraph.attributes?.align === 'justify' ? AlignmentType.JUSTIFIED : undefined,
                // direction
                // indent
                // blockquote
                // code block
            }));
        }
    };

    // build 

    return paragraphs;
}

// generate a paragraph as an array of text runs
function buildParagraph(paragraph: QParagraph): TextRun[] {
    const textRuns: TextRun[] = [];
    for (const run of paragraph.textRuns!) {
        // if formula
        if ((run as {formula: string}).formula) {

        // if text
        } else if ((run as QTextRun).text) {
            textRuns.push(buildTextRun(run as QTextRun));
        }
    };
    return textRuns;
}

// generate a text run
function buildTextRun(run: QTextRun): TextRun {
    const textRun = new TextRun({
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
    return textRun;
}

// build a formula
function buildFormula(formula: string) {

}

// build an image
function buildImage(image: string) {

}

// build a video
function buildVideo(video: string) {

}






// allow user to set the 