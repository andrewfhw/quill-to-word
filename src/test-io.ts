import { Document, Paragraph, TextRun, Packer, UnderlineType, HyperlinkType, HyperlinkRef, HeadingLevel, AlignmentType, Media } from 'docx';
import { chdir } from 'process';
import { RawQuillDelta, ParsedQuillDelta } from 'quilljs-parser';
import { customLevels, defaultStyles } from './default-styles';

type DocInputTest = RawQuillDelta | ParsedQuillDelta | ParsedQuillDelta[];
type DocOutputFn = () => Promise<Document>;

export const blank_doc_input: DocInputTest = {
    ops: [{
        insert: ''
    }]
}

export async function blankDocOutput(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: []
            })
        ]
    });
    return doc;
}

export const simple_paragraph_input: DocInputTest = {
    ops: [{
        insert: 'This is a simple paragraph written into the Quill editor. This will just be a test of the docx exporting feature.'
    }]
}

export async function simpleParagraphOutput(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is a simple paragraph written into the Quill editor. This will just be a test of the docx exporting feature.'
                    })
                ]
            })
        ]
    });
    return doc;
}

export const multi_paragraph_input: DocInputTest = {
    ops: [{
        insert: 'Here is the first paragraph of the document.\nThis is the second paragraph of the document.\nHere is the third paragraph of the document.'
    }]
}

export async function multiParagraphOutput() {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is the first paragraph of the document.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is the second paragraph of the document.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is the third paragraph of the document.'
                    })
                ]
            })
        ]
    });
    return doc;
}

export const run_formatting: DocInputTest = {
    ops: [{
        insert: 'Here is a test of the run formatting with '
    },{
        insert: 'some bold text written here',
        attributes: {
            bold: true
        }
    },{
        insert: ' but then it stops and we switch to '
    },{
        insert: 'some text that is underlined',
        attributes: {
            underline: true
        }
    },{
        insert: ' and then we stop the underline too\nHere is some text that is '
    },{
        insert: 'both bold and italicized',
        attributes: {
            bold: true,
            italic: true
        }
    },{
        insert: '\nAnd then some new text with a '
    },{
        insert: 'subscript',
        attributes: {
            script: 'sub'
        }
    },{
        insert: ' and back to normal but then '
    },{
        insert: 'superscript',
        attributes: {
            script: 'super'
        }
    },{
        insert: ' and stop and newline\nAnd strike some text ' 
    },{
        insert: 'striked text here',
        attributes: {
            strike: true
        }
    },{
        insert: ' back to normal '
    },{
        insert: 'this text will be colored',
        attributes: {
            color: '#cc0000'
        }
    },{
        insert: ' but then normal text '
    },{
        insert: 'highlight color',
        attributes: {
            background: 'yellow'
        }
    },{
        insert: ' and normal'
    }]
}

export async function runFormatting() {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is a test of the run formatting with '
                    }),
                    new TextRun({
                        text: 'some bold text written here',
                        bold: true
                    }),
                    new TextRun({
                        text: ' but then it stops and we switch to '
                    }),
                    new TextRun({
                        text: 'some text that is underlined',
                        underline: {
                            color: 'auto',
                            type: UnderlineType.SINGLE
                        }
                    }),
                    new TextRun({
                        text: ' and then we stop the underline too'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is some text that is '
                    }),
                    new TextRun({
                        text: 'both bold and italicized',
                        bold: true,
                        italics: true
                    }),
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'And then some new text with a '
                    }),
                    new TextRun({
                        text: 'subscript',
                        subScript: true
                    }),
                    new TextRun({
                        text: ' and back to normal but then '
                    }),
                    new TextRun({
                        text: 'superscript',
                        superScript: true
                    }),
                    new TextRun({
                        text: ' and stop and newline'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'And strike some text '
                    }),
                    new TextRun({
                        text: 'striked text here',
                        strike: true
                    }),
                    new TextRun({
                        text: ' back to normal '
                    }),
                    new TextRun({
                        text: 'this text will be colored',
                        color: 'cc0000'
                    }),
                    new TextRun({
                        text: ' but then normal text '
                    }),
                    new TextRun({
                        text: 'highlight color',
                        highlight: 'yellow'
                    }),
                    new TextRun({
                        text: ' and normal'
                    })
                ]
            })
        ]
    })
    return doc;
}

export const hyperlinks_simple: DocInputTest = {
    ops: [{
        insert: 'Here is some basic text with a '
    },{
        insert: 'link to Google',
        attributes: {
            link: 'https://google.com'
        }
    },{
        insert: '. And then I just continue on writing about stuff until I add another link to '
    },{
        insert: 'GitHub',
        attributes: {
            link: 'https://github.com'
        }
    },{
        insert: '.\nNow we start a new line down here.'
    }]
}

export async function hyperlinksSimple() {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: {
            link0: {
                link: 'https://google.com',
                text: 'link to Google',
                type: HyperlinkType.EXTERNAL
            },
            link1: {
                link: 'https://github.com',
                text: 'GitHub',
                type: HyperlinkType.EXTERNAL
            }
        }
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is some basic text with a '
                    }),
                    new HyperlinkRef('link0'),
                    new TextRun({
                        text: '. And then I just continue on writing about stuff until I add another link to '
                    }),
                    new HyperlinkRef('link1')
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Now we start a new line down here.'
                    })
                ]
            })
        ]
    });
    return doc;
}

export const header_simple: DocInputTest = {
    ops: [{
        insert: 'The Political Communication Theory'
    },{
        insert: '\n',
        attributes: {
            header: 1
        }
    },{
        insert: 'This is just some basic text written in paragraph format.\nA Level Two Heading'
    },{
        insert: '\n',
        attributes: {
            header: 2
        }
    },{
        insert: 'This is some normal text written under the level two heading'
    }]
}

export async function headerSimple(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'The Political Communication Theory'
                    })
                ],
                heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is just some basic text written in paragraph format.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'A Level Two Heading'
                    })
                ],
                heading: HeadingLevel.HEADING_2
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is some normal text written under the level two heading'
                    })
                ]
            })
        ]
    })
    return doc;
}

export const code_block_simple: DocInputTest = {
    ops: [{
        insert: 'This is going to be a test of the code block formatting.\nThis is formatted as a code block now'
    },{
        insert: '\n',
        attributes: {
            "code-block": true
        }
    },{
        insert: 'Back to just some normal text down here for testing.'
    }]
}

export async function codeblockSimple(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is going to be a test of the code block formatting.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is formatted as a code block now'
                    })
                ],
                style: 'code_block'
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Back to just some normal text down here for testing.'
                    })
                ]
            })
        ]
    });
    return doc;
}

export const block_quote_simple: DocInputTest = {
    ops: [{
        insert: 'Here is some basic text in the document.\nThen I will write a nice block quote for testing purposes.'
    },{
        insert: '\n',
        attributes: {
            blockquote: true
        }
    },{
        insert: 'Here is just a normal paragraph of text.\n'
    }]
}

export async function blockquoteSimple(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is some basic text in the document.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Then I will write a nice block quote for testing purposes.'
                    })
                ],
                style: 'block_quote'
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is just a normal paragraph of text.'
                    })
                ]
            }),
            new Paragraph({
                children: []
            })
        ]
    });
    return doc;
}

export const align_simple: DocInputTest = {
    ops: [{
        insert: 'This line will be centered'
    },{
        insert: '\n',
        attributes: {
            align: 'center'
        }
    },{
        insert: 'Now this line will be right aligned.'
    },{
        insert: '\n',
        attributes: {
            align: 'right'
        }
    },{
        insert: 'This line will be justified against the right of the document.'
    },{
        insert: '\n',
        attributes: {
            align: 'justify'
        }
    }]
}

export async function alignSimple(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This line will be centered'
                    })
                ],
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Now this line will be right aligned.'
                    })
                ],
                alignment: AlignmentType.RIGHT
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This line will be justified against the right of the document.'
                    })
                ],
                alignment: AlignmentType.JUSTIFIED
            }),
            new Paragraph({
                children: []
            })
        ]
    })
    return doc;
}

export const bullet_simple: DocInputTest = {
    ops: [{
        insert: 'Below I will compose a bulleted list.\nHere is the first item in the list'
    },{
        insert: '\n',
        attributes: {
            list: 'bullet'
        }
    },{
        insert: 'This is the second bullet in the list'
    },{
        insert: '\n',
        attributes: {
            list: 'bullet'
        }
    },{
        insert: 'This is an indented bullet point'
    },{
        insert: '\n',
        attributes: {
            list: 'bullet',
            indent: 1
        }
    },{
        insert: 'Here is another indented bullet point'
    },{
        insert: '\n',
        attributes: {
            list: 'bullet',
            indent: 1
        }
    },{
        insert: 'This is back to the main level of the list'
    },{
        insert: '\n',
        attributes: {
            list: 'bullet'
        }
    },{
        insert: 'Now we make sure that the list terminates\n'
    }]
}

export async function bulletSimple(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Below I will compose a bulleted list.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is the first item in the list'
                    })
                ],
                bullet: {
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is the second bullet in the list'
                    })
                ],
                bullet: {
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is an indented bullet point'
                    })
                ],
                bullet: {
                    level: 1
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is another indented bullet point'
                    })
                ],
                bullet: {
                    level: 1
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is back to the main level of the list'
                    })
                ],
                bullet: {
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Now we make sure that the list terminates'
                    })
                ]
            }),
            new Paragraph({
                children: []
            })
        ]
    })
    return doc;
}

export const bullet_formatted: DocInputTest = {
    ops: [{
        insert: 'Here is the first bullet point in the list with some '
    },{
        insert: 'bold formatted text at the end',
        attributes: {
            bold: true
        }
    },{
        insert: '\n',
        attributes: {
            list: 'bullet'
        }
    },{
        insert: 'Here is another bullet point in the list with some '
    },{
        insert: 'underlined text written here',
        attributes: {
            underline: true
        }
    },{
        insert: ' but then back to normal'
    },{
        insert: '\n',
        attributes: {
            list: 'bullet'
        }
    }]
}

export async function bulletFormatted(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is the first bullet point in the list with some '
                    }),
                    new TextRun({
                        text: 'bold formatted text at the end',
                        bold: true
                    })
                ],
                bullet: {
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is another bullet point in the list with some '
                    }),
                    new TextRun({
                        text: 'underlined text written here',
                        underline: {
                            color: 'auto',
                            type: UnderlineType.SINGLE
                        }
                    }),
                    new TextRun({
                        text: ' but then back to normal'
                    })
                ],
                bullet: {
                    level: 0
                }
            }),
            new Paragraph({
                children: []
            })
        ]
    })
    return doc;
}

export const ordered_simple: DocInputTest = {
    ops: [{
        insert: 'Here is the start of a document\nThis is the first point in the list'
    },{
        insert: '\n',
        attributes: {
            list: 'ordered'
        }
    },{
        insert: 'This is the second bullet point in the list'
    },{
        insert: '\n',
        attributes: {
            list: 'ordered'
        }
    },{
        insert: 'Here is a subpoint in the list'
    },{
        insert: '\n',
        attributes: {
            list: 'ordered',
            indent: 1
        }
    },{
        insert: 'Some more basic text in indented level'
    },{
        insert: '\n',
        attributes: {
            list: 'ordered',
            indent: 1
        }
    },{
        insert: 'And back to the main level'
    },{
        insert: '\n',
        attributes: {
            list: 'ordered'
        }
    },{
        insert: 'Now we are just going to write a normal line of text.\nHere is the first line in the next list.'
    },{
        insert: '\n',
        attributes: {
            list: 'ordered'
        }
    },{
        insert: 'And then the second bullet in the list'
    },{
        insert: '\n',
        attributes: {
            list: 'ordered'
        }
    }]
}

export async function orderedSimple(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: {
            config: [{
                reference: 'numbered_0',
                levels: customLevels
            },{
                reference: 'numbered_1',
                levels: customLevels
            }]
        },
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is the start of a document'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is the first point in the list'
                    })
                ],
                numbering: {
                    reference: 'numbered_0',
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is the second bullet point in the list'
                    })
                ],
                numbering: {
                    reference: 'numbered_0',
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is a subpoint in the list'
                    })
                ],
                numbering: {
                    reference: 'numbered_0',
                    level: 1
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Some more basic text in indented level'
                    })
                ],
                numbering: {
                    reference: 'numbered_0',
                    level: 1
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'And back to the main level'
                    })
                ],
                numbering: {
                    reference: 'numbered_0',
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Now we are just going to write a normal line of text.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is the first line in the next list.'
                    })
                ],
                numbering: {
                    reference: 'numbered_1',
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'And then the second bullet in the list'
                    })
                ],
                numbering: {
                    reference: 'numbered_1',
                    level: 0
                }
            }),
            new Paragraph({
                children: []
            })
        ]
    });
    return doc;
}

export const embeds_simple: DocInputTest = {
    ops: [{
        insert: 'I will test some of the embed features now\n'
    },{
        insert: {
            video: 'https://hereisavideolink.com'
        }
    },{
        insert: 'And then we just keep adding more text until we write our formula here '
    },{
        insert: {
            formula: 'e=mc^2'
        }
    },{
        insert: ' and then finish out this line\n'
    }]
}

export async function embedsSimple(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'I will test some of the embed features now'
                    })
                ]
            }),
            new Paragraph({
                children: []
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'https://hereisavideolink.com'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'And then we just keep adding more text until we write our formula here '
                    }),
                    new TextRun({
                        text: 'e=mc^2'
                    }),
                    new TextRun({
                        text: ' and then finish out this line'
                    })
                ]
            }),
            new Paragraph({
                children: []
            })
        ]
    })
    return doc;
}

export const parsed_delta: ParsedQuillDelta = {
    setup: {
        hyperlinks: [],
        numberedLists: 0
    },
    paragraphs: [{
        textRuns: [{
            text: 'Here is some text to enter into the first paragraph of the document. I am just writing miscellaneous stuff in here for basic testing. Sometimes we write stuff that is '
        },{
            text: 'bolded for emphasis',
            attributes: {
                bold: true
            }
        },{
            text: ' but sometimes we do not. We can also try to '
        },{
            text: 'underline some content too.',
            attributes: {
                underline: true
            }
        },{
            text: ' And then just start a new sentence.'
        }]
    },{
        textRuns: [{
            text: 'This is a Heading in the Document'
        }],
        attributes: {
            header: 1
        }
    },{
        textRuns: [{
            text: 'This is a bullet point in the doc'
        }],
        attributes: {
            list: 'bullet'
        }
    },{
        textRuns: [{
            text: 'Here is a bullet point that also has some '
        },{
            text: 'italicized text written in',
            attributes: {
                italic: true
            }
        }]
    }]
}

export async function parsedDelta(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    doc.addSection({
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is some text to enter into the first paragraph of the document. I am just writing miscellaneous stuff in here for basic testing. Sometimes we write stuff that is '
                    }),
                    new TextRun({
                        text: 'bolded for emphasis',
                        bold: true
                    }),
                    new TextRun({
                        text: ' but sometimes we do not. We can also try to '
                    }),
                    new TextRun({
                        text: 'underline some content too.',
                        underline: {
                            color: 'auto',
                            type: UnderlineType.SINGLE
                        }
                    }),
                    new TextRun({
                        text: ' And then just start a new sentence.'
                    })
                ]
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is a Heading in the Document'
                    })
                ],
                heading: HeadingLevel.HEADING_1
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'This is a bullet point in the doc'
                    })
                ],
                bullet: {
                    level: 0
                }
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: 'Here is a bullet point that also has some '
                    }),
                    new TextRun({
                        text: 'italicized text written in',
                        italics: true
                    })
                ]
            })
        ]
    })
    return doc;
}

export async function parsedDeltaArray(): Promise<Document> {
    const doc = new Document({
        styles: {
            paragraphStyles: defaultStyles
        },
        numbering: undefined,
        hyperlinks: undefined
    });
    const children = [
        new Paragraph({
            children: [
                new TextRun({
                    text: 'Here is some text to enter into the first paragraph of the document. I am just writing miscellaneous stuff in here for basic testing. Sometimes we write stuff that is '
                }),
                new TextRun({
                    text: 'bolded for emphasis',
                    bold: true
                }),
                new TextRun({
                    text: ' but sometimes we do not. We can also try to '
                }),
                new TextRun({
                    text: 'underline some content too.',
                    underline: {
                        color: 'auto',
                        type: UnderlineType.SINGLE
                    }
                }),
                new TextRun({
                    text: ' And then just start a new sentence.'
                })
            ]
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: 'This is a Heading in the Document'
                })
            ],
            heading: HeadingLevel.HEADING_1
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: 'This is a bullet point in the doc'
                })
            ],
            bullet: {
                level: 0
            }
        }),
        new Paragraph({
            children: [
                new TextRun({
                    text: 'Here is a bullet point that also has some '
                }),
                new TextRun({
                    text: 'italicized text written in',
                    italics: true
                })
            ]
        })
    ];
    doc.addSection({
        children: children
    });
    doc.addSection({
        children: children
    });
    return doc;
}