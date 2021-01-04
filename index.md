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

## How Can I Configure QuillToWord?

Configuration options are coming.
