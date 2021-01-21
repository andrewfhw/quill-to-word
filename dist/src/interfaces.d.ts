/// <reference types="node" />
import { AlignmentType, UnderlineType } from "docx";
import * as docx from 'docx';
export declare type ExportObject = docx.Document | Blob | Buffer | string;
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
    citation?: StyleProperties;
}
export interface Config {
    paragraphStyles?: StyleConfig;
    exportAs?: 'doc' | 'blob' | 'buffer' | 'base64';
}
//# sourceMappingURL=interfaces.d.ts.map