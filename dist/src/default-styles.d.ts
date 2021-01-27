import { CustomLevels } from './interfaces';
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
            hanging?: undefined;
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
            hanging?: undefined;
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
    paragraph: {
        indent: {
            left: number;
            hanging: number;
            right?: undefined;
        };
        spacing: {
            line: number;
            before?: undefined;
            after?: undefined;
        };
        border?: undefined;
    };
    next?: undefined;
})[];
export declare const customNumberedLevels: CustomLevels[];
export declare const customBulletLevels: CustomLevels[];
export declare const defaultNumbering: {
    config: {
        reference: string;
        levels: CustomLevels[];
    }[];
};
//# sourceMappingURL=default-styles.d.ts.map