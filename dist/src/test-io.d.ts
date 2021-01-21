import { Document } from 'docx';
import { RawQuillDelta, ParsedQuillDelta } from 'quilljs-parser';
import { Config } from './interfaces';
declare type DocInputTest = RawQuillDelta | ParsedQuillDelta | ParsedQuillDelta[];
export declare const blank_doc_input: DocInputTest;
export declare function blankDocOutput(): Promise<Document>;
export declare const simple_paragraph_input: DocInputTest;
export declare function simpleParagraphOutput(): Promise<Document>;
export declare const multi_paragraph_input: DocInputTest;
export declare function multiParagraphOutput(): Promise<Document>;
export declare const run_formatting: DocInputTest;
export declare function runFormatting(): Promise<Document>;
export declare const hyperlinks_simple: DocInputTest;
export declare function hyperlinksSimple(): Promise<Document>;
export declare const header_simple: DocInputTest;
export declare function headerSimple(): Promise<Document>;
export declare const code_block_simple: DocInputTest;
export declare function codeblockSimple(): Promise<Document>;
export declare const block_quote_simple: DocInputTest;
export declare function blockquoteSimple(): Promise<Document>;
export declare const align_simple: DocInputTest;
export declare function alignSimple(): Promise<Document>;
export declare const bullet_simple: DocInputTest;
export declare function bulletSimple(): Promise<Document>;
export declare const bullet_formatted: DocInputTest;
export declare function bulletFormatted(): Promise<Document>;
export declare const ordered_simple: DocInputTest;
export declare function orderedSimple(): Promise<Document>;
export declare const embeds_simple: DocInputTest;
export declare function embedsSimple(): Promise<Document>;
export declare const parsed_delta: ParsedQuillDelta;
export declare function parsedDelta(): Promise<Document>;
export declare function parsedDeltaArray(): Promise<Document>;
export declare const custom_styles_delta: DocInputTest;
export declare const custom_style_header: Config;
export declare function customStyleHeader(): Promise<Document>;
export declare const custom_style_normal: Config;
export declare function customStyleNormal(): Promise<Document>;
export declare const custom_style_block_quote: Config;
export declare function customStyleBlockquote(): Promise<Document>;
export declare const custom_style_code_block: Config;
export declare const custom_code_delta: DocInputTest;
export declare function customCodeStyle(): Promise<Document>;
export declare const custom_style_list: Config;
export declare function customListStyle(): Promise<Document>;
export {};
//# sourceMappingURL=test-io.d.ts.map