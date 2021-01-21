import { AlignmentType } from 'docx';

export const defaultStyles = [{
    id: 'normal',
    name: 'Normal',
    next: 'normal',
    basedOn: 'normal',
    quickFormat: true,
    run: {
      size: 24
    },
    paragraph: {
      spacing: {
        line: 480,
        before: 0,
        after: 0
      }
    }
  },{
    id: 'header_1',
    name: 'Heading 1',
    next: 'normal',
    quickFormat: true,
    run: {
      font: 'Calibri',
      size: 30,
      bold: true
    },
    paragraph: {
      spacing: {
        before: 300,
        after: 200
      }
    }
  },{
    id: 'header_2',
    name: 'Heading 2',
    basedOn: 'normal',
    next: 'normal',
    quickFormat: true,
    run: {
      font: 'Calibri',
      size: 26,
      bold: true
    },
    paragraph: {
      spacing: {
        before: 200,
        after: 100
      }
    }
  },{
    id: 'list_paragraph',
    name: 'List Paragraph',
    basedOn: 'normal',
    quickFormat: true,
    run: {
      size: 24
    }
  },{
    id: 'code_block',
    name: 'Code Block',
    basedOn: 'normal',
    quickFormat: true,
    run: {
      size: 24,
      font: 'Courier New'
    },
    paragraph: {
      indent: { left: 720, right: 720 }
    }
  },{
    id: 'block_quote',
    name: 'Block Quote',
    basedOn: 'normal',
    quickFormat: true,
    run: {
      italics: true
    },
    paragraph: {
      indent: { left: 540 },
      border: {
        left: {
          size: 12,
          space: 28,
          color: '333333',
          value: 'single'
        }
      }
    }
  },{
    id: 'citation',
    name: 'Citation',
    basedOn: 'normal',
    quickFormat: true,
    paragraph: {
      indent: {
        left: 720,
        hanging: 720
      }
    }
  }];
  
export const customLevels = [{
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

export const defaultNumbering = {
    config: [{
    reference: 'default-numbering',
    levels: customLevels
    }]
}