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
        italics?: undefined;
    };
    paragraph: {
        spacing: {
            line: number;
            before: number;
            after: number;
        };
        indent?: undefined;
        border?: undefined;
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
        italics?: undefined;
    };
    paragraph: {
        spacing: {
            before: number;
            after: number;
            line?: undefined;
        };
        indent?: undefined;
        border?: undefined;
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
        italics?: undefined;
    };
    paragraph: {
        spacing: {
            before: number;
            after: number;
            line?: undefined;
        };
        indent?: undefined;
        border?: undefined;
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
        italics?: undefined;
    };
    next?: undefined;
    paragraph?: undefined;
} | {
    id: string;
    name: string;
    basedOn: string;
    quickFormat: boolean;
    run: {
        size: number;
        font: string;
        bold?: undefined;
        italics?: undefined;
    };
    paragraph: {
        indent: {
            left: number;
            right: number;
        };
        spacing?: undefined;
        border?: undefined;
    };
    next?: undefined;
} | {
    id: string;
    name: string;
    basedOn: string;
    quickFormat: boolean;
    run: {
        italics: boolean;
        size?: undefined;
        font?: undefined;
        bold?: undefined;
    };
    paragraph: {
        indent: {
            left: number;
            right?: undefined;
        };
        border: {
            left: {
                size: number;
                space: number;
                color: string;
                value: string;
            };
        };
        spacing?: undefined;
    };
    next?: undefined;
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