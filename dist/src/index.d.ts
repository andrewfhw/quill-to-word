import { ParsedQuillDelta, RawQuillDelta } from 'quilljs-parser';
import * as docx from 'docx';
import { AlignmentType, UnderlineType } from 'docx';
export interface ParagraphProperties {
    spacing?: {
        line?: number;
        before?: number;
        after?: number;
    };
    alignment?: AlignmentType;
    indent?: {
        left?: number;
        hanging?: number;
        right?: number;
    };
}
export interface RunProperties {
    font?: string;
    size?: number;
    bold?: boolean;
    color?: string;
    underline?: {
        type?: UnderlineType;
        color?: string;
    };
    italics?: boolean;
    highlight?: string;
}
export interface StyleProperties {
    paragraph?: ParagraphProperties;
    run?: RunProperties;
}
export interface StyleConfig {
    normal?: StyleProperties;
    header_1?: StyleProperties;
    header_2?: StyleProperties;
    list_paragraph?: StyleProperties;
    code_block?: StyleProperties;
    block_quote?: StyleProperties;
}
export interface Config {
    paragraphStyles?: StyleConfig;
}
export declare function generateWord(delta: RawQuillDelta | ParsedQuillDelta | ParsedQuillDelta[], config?: object): Promise<docx.Document>;
//# sourceMappingURL=index.d.ts.map