import { generateWord } from './index';
import { blank_doc_input, blankDocOutput, simple_paragraph_input, simpleParagraphOutput, multi_paragraph_input, multiParagraphOutput, run_formatting, runFormatting, hyperlinks_simple, hyperlinksSimple, header_simple, headerSimple, code_block_simple, codeblockSimple, block_quote_simple, blockquoteSimple, align_simple, alignSimple, bullet_simple, bulletSimple, bullet_formatted, bulletFormatted, ordered_simple, orderedSimple, embeds_simple, embedsSimple, parsed_delta, parsedDelta, parsedDeltaArray, custom_style_header, custom_styles_delta, customStyleHeader, custom_style_normal, customStyleNormal, custom_style_block_quote, customStyleBlockquote, custom_style_code_block, custom_code_delta, customCodeStyle, custom_style_list, customListStyle } from './test-io';
import * as docx from 'docx';

describe('converts quill to docx', () => {

    test('blank doc', async () => {
        const input = await generateWord(blank_doc_input);
        const output = await blankDocOutput();
        expect(input).toEqual(output);
    });

    test('simple paragraph', async () => {
        const input = await generateWord(simple_paragraph_input);
        const output = await simpleParagraphOutput();
        expect(input).toEqual(output);
    });

    test('multi paragraph', async () => {
        const input = await generateWord(multi_paragraph_input);
        const output = await multiParagraphOutput();
        expect(input).toEqual(output);
    });

    test('run formatting', async () => {
        const input = await generateWord(run_formatting);
        const output = await runFormatting();
        expect(input).toEqual(output);
    });

    test.skip('simple hyperlinks', async () => {
        const input = await generateWord(hyperlinks_simple);
        const output = await hyperlinksSimple();
        expect(input).toEqual(output);
    });

    test('simple headers', async () => {
        const input = await generateWord(header_simple);
        const output = await headerSimple();
        expect(input).toEqual(output);
    });

    test('simple code block', async () => {
        const input = await generateWord(code_block_simple);
        const output = await codeblockSimple();
        expect(input).toEqual(output);
    });

    test('simple block quote', async () => {
        const input = await generateWord(block_quote_simple);
        const output = await blockquoteSimple();
        expect(input).toEqual(output);
    });

    test('simple alignment', async () => {
        const input = await generateWord(align_simple);
        const output = await alignSimple();
        expect(input).toEqual(output);
    });

    test('simple bullet', async () => {
        const input = await generateWord(bullet_simple);
        const output = await bulletSimple();
        expect(input).toEqual(output);
    });

    test('bullet with format', async () => {
        const input = await generateWord(bullet_formatted);
        const output = await bulletFormatted();
        expect(input).toEqual(output);
    });

    test('ordered list', async () => {
        const input = await generateWord(ordered_simple);
        const output = await orderedSimple();
        expect(input).toEqual(output);
    });

    test('embeds simple', async () => {
        const input = await generateWord(embeds_simple);
        const output = await embedsSimple();
        expect(input).toEqual(output);
    });

    test('input parsed delta', async () => {
        const input = await generateWord(parsed_delta);
        const output = await parsedDelta();
        expect(input).toEqual(output);
    });

    test('parsed delta array', async () => {
        const input = await generateWord([parsed_delta, parsed_delta]);
        const output = await parsedDeltaArray();
        expect(input).toEqual(output);
    });

});

describe('custom style configuration', () => {

    test('custom heading style', async () => {
        const input = await generateWord(custom_styles_delta, custom_style_header);
        const output = await customStyleHeader();
        expect(input).toEqual(output);
    });

    test('custom normal style', async () => {
        const input = await generateWord(custom_styles_delta, custom_style_normal);
        const output = await customStyleNormal();
        expect(input).toEqual(output);
    });

    test('custom style blockquote', async () => {
        const input = await generateWord(custom_styles_delta, custom_style_block_quote);
        const output = await customStyleBlockquote();
        expect(input).toEqual(output);
    });

    test('custom code style', async () => {
        const input = await generateWord(custom_code_delta, custom_style_code_block);
        const output = await customCodeStyle();
        expect(input).toEqual(output);
    });

    test('custom style list', async () => {
        const input = await generateWord(bullet_simple, custom_style_list);
        const output = await customListStyle();
        expect(input).toEqual(output);
    });

});

describe('custom export format configuration', () => {

    test('export to blob', async () => {
        const output = await generateWord(bullet_formatted, { exportAs: 'blob' });
        expect(output instanceof Blob).toBe(true);
    });

    test('export to buffer', async () => {
        const output = await generateWord(simple_paragraph_input, { exportAs: 'buffer' });
        const buffer = Buffer.isBuffer(output);
        const uint8 = output instanceof Uint8Array;
        expect(buffer || uint8).toBe(true);
    });

    test('export to base64 string', async () => {
        const output = await generateWord(header_simple, { exportAs: 'base64' });
        expect(typeof output).toBe('string');
    });

    test('export to doc', async () => {
        const output = await generateWord(ordered_simple, { exportAs: 'doc' });
        expect(output instanceof docx.Document).toBe(true);
    });

});