import { generateWord } from './index';
import { blank_doc_input, blankDocOutput, simple_paragraph_input, simpleParagraphOutput, multi_paragraph_input, multiParagraphOutput, run_formatting, runFormatting, hyperlinks_simple, hyperlinksSimple, header_simple, headerSimple, code_block_simple, codeblockSimple, block_quote_simple, blockquoteSimple, align_simple, alignSimple, bullet_simple, bulletSimple, bullet_formatted, bulletFormatted, ordered_simple, orderedSimple, embeds_simple, embedsSimple, parsed_delta, parsedDelta, parsedDeltaArray } from './test-io';

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

    test.only('parsed delta array', async () => {
        const input = await generateWord([parsed_delta, parsed_delta]);
        const output = await parsedDeltaArray();
        expect(input).toEqual(output);
    });

});