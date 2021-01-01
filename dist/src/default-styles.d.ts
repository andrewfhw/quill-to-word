import { AlignmentType } from 'docx';
export declare const defaultStyles: ({
    id: string;
    name: string;
    next: string;
    basedOn: string;
    quickFormat: boolean;
    run: {
        size: number;
        font?: undefined;
        bold?: undefined;
    };
    paragraph: {
        spacing: {
            line: number;
            before: number;
            after: number;
        };
    };
} | {
    id: string;
    name: string;
    next: string;
    quickFormat: boolean;
    run: {
        font: string;
        size: number;
        bold: boolean;
    };
    paragraph: {
        spacing: {
            before: number;
            after: number;
            line?: undefined;
        };
    };
    basedOn?: undefined;
} | {
    id: string;
    name: string;
    basedOn: string;
    next: string;
    quickFormat: boolean;
    run: {
        font: string;
        size: number;
        bold: boolean;
    };
    paragraph: {
        spacing: {
            before: number;
            after: number;
            line?: undefined;
        };
    };
} | {
    id: string;
    name: string;
    basedOn: string;
    quickFormat: boolean;
    run: {
        size: number;
        font?: undefined;
        bold?: undefined;
    };
    next?: undefined;
    paragraph?: undefined;
})[];
export declare const customLevels: {
    level: number;
    format: string;
    text: string;
    alignment: AlignmentType;
    style: {
        paragraph: {
            indent: {
                left: number;
                hanging: number;
            };
        };
    };
}[];
export declare const defaultNumbering: {
    config: {
        reference: string;
        levels: {
            level: number;
            format: string;
            text: string;
            alignment: AlignmentType;
            style: {
                paragraph: {
                    indent: {
                        left: number;
                        hanging: number;
                    };
                };
            };
        }[];
    }[];
};
//# sourceMappingURL=default-styles.d.ts.map