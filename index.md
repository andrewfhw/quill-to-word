![npm](https://img.shields.io/npm/v/quill-to-word) ![Travis (.com)](https://img.shields.io/travis/com/andrewraygilbert/quill-to-word) ![GitHub last commit](https://img.shields.io/github/last-commit/andrewraygilbert/quill-to-word) ![npm](https://img.shields.io/npm/dm/quill-to-word) ![GitHub issues](https://img.shields.io/github/issues/andrewraygilbert/quill-to-word) ![NPM](https://img.shields.io/npm/l/quill-to-word)

# QuillToWord

**Simple Description**: Turn the content in your [QuillJS](https://quilljs.com/) editor into a downloadable Microsoft Word document.

**Technical Description**: Convert a QuillJS delta object into a .docx file.

## How to Install

Install using npm:

```npm i quill-to-word --save```

## How Do I Use It?

Pass a QuillJS [delta](https://quilljs.com/docs/delta/) object to the `generateWord()` function of the `quill-to-word` package. Be sure to `await` the `generateWord()` function, because it returns a `Promise`.

```javascript
const quillDelta = quillInstance.getContents();
const doc = await quillToWord.generateWord(quillDelta);
```

`quillInstance` refers to the object created by calling `new Quill()`.

## What Does the Package Do?

This package creates a Microsoft Word DOCX file from a QuillJS Delta. In short, this package will allow you to download the contents of your QuillJS in-browser editor as a Word document.

## How Does It Work?

QuillJS stores its content in a delta format. QuillToWord parses a Quill delta object into a paragraph format using [QuillJSParser](https://github.com/andrewraygilbert/quilljs-parser). Then, QuillToWord generates a Word document, using the popular [DOCX package](https://docx.js.org/#/).

## How Can I Download the Word Document from the Browser?

You can download the Word document created by QuillToWord by using the [FileSaver package](https://www.npmjs.com/package/file-saver). You'll need to install `file-saver`.

```npm i file-saver --save```

```npm i @types/file-saver --save-dev```

Here is an example of downloading from a browser.

```typescript
import { saveAs } from 'file-saver';
import * as quillToWord from 'quill-to-word';
import * as quill from 'quilljs';

const quillInstance = new Quill();
const delta = quillInstance.getContents();
const quillToWordConfig = {
    exportAs: 'blob'
};
const docAsBlob = await quillToWord.generateWord(delta, quillToWordConfig);
saveAs(docAsBlob, 'word-export.docx');
```

## How Can I Configure QuillToWord?

QuillToWord supports two configurable options: **export** configuration and **style** configuration.

### Export Configuration

By default, QuillToWord will return a docx object from a call to `generateWord()`. QuillToWord is also capable of returning a `Blob`, a `Buffer`, or a `base64` string. To obtain one of these alternative objects, pass a configuration object as the second argument to `generateWord()`. See the example below.

```javascript
const quill_delta = quillInstance.getContents();
const configuration = {
    exportAs: 'blob' // could also be 'buffer', 'base64', or 'doc'
}

const docx_blob = await quillToWord.generateWord(quill_delta, configuration); // returns Promise<Blob>
```
### Style Configuration

As you are likely aware, Microsoft Word documents enable users to specify style formats for various types of text within a document. For instance, specific fonts, sizes, and spacing can be set for headings, normal text, block quotes, and so forth.

QuillToWord is prepackaged with default styles for several types of text commonly used within a quill editor: normal, heading 1, heading 2, lists, code blocks, and block quotes. If you prefer to specify your own styling for these types of text, you can pass a configuration object as the second argument to `generateWord()`. The configuration object should satisfy the following interface:

```typescript
interface Configuration {
    paragraphStyles: {
        normal?: {  // this is the name of the text type that you'd like to style
            paragraph?: {
                spacing?: {
                    line?: number;
                    before?: number;
                    after?: number;
                },
                alignment?: AlignmentType // from docx package
                indent?: {
                    left?: number;
                    hanging?: number;
                    right?: number;
                }
            },
            run?: {
                font?: string;
                size?: number;
                bold?: boolean;
                color?: string; // as hex value e.g., ffaaff
                underline?: {
                    type?: UnderlineType; // from docx package
                    color?: string // just use 'auto'
                }
                italics?: boolean;
                highlight?: string; // must be named values accepted by Word, like 'yellow'
            }
        }
    }
}
```

Note that all of the same properties shown for `normal` here can be set for the following: `heading_1`, `heading_2`, `list_paragraph`, `code_block`, and `block_quote`. 

Also, be aware that most of the formats are based on the `normal` format. As a result, modifying the `normal` format could cause changes in the other formats as well.

Now, let's see an example of configuring the header format. The configuration object in the example below will override the default styling for heading level one.

```typescript
const quill_delta = quillInstance.getContents();
const config: Config = {
    paragraphStyles: {
        header_1: {
            paragraph: {
                spacing: {
                    before: 1200,
                    after: 1000
                }
            },
            run: {
                size: 64,
                bold: true,
                color: 'ff88bb'
            }
        }
    }
};
const doc = await quillToWord.generateWord(quill_delta, config);
```

