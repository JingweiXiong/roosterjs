import { ContentModelDocument } from '../../../lib/publicTypes/group/ContentModelDocument';
import { ContentModelParagraph } from '../../../lib/publicTypes/block/ContentModelParagraph';
import { ContentModelQuote } from '../../../lib/publicTypes/group/ContentModelQuote';
import { createParagraph } from '../../../lib/modelApi/creators/createParagraph';
import { createQuote } from '../../../lib/modelApi/creators/createQuote';
import {
    wrapBlockStep1,
    WrapBlockStep1Result,
    wrapBlockStep2,
} from '../../../lib/modelApi/common/wrapBlock';

describe('wrapBlockStep1', () => {
    it('null parent', () => {
        const result: WrapBlockStep1Result<ContentModelQuote>[] = [];
        const canMerge = jasmine.createSpy().and.returnValue(true);

        wrapBlockStep1(
            result,
            null,
            {
                blockType: 'Paragraph',
                segments: [],
                format: {},
            },
            createQuote,
            canMerge as any
        );

        expect(result).toEqual([]);
        expect(canMerge).not.toHaveBeenCalled();
    });

    it('Valid parent', () => {
        const result: WrapBlockStep1Result<ContentModelQuote>[] = [];
        const para: ContentModelParagraph = {
            blockType: 'Paragraph',
            segments: [],
            format: {},
            isImplicit: true,
        };
        const parent: ContentModelDocument = {
            blockGroupType: 'Document',
            blocks: [para],
        };
        const canMerge = jasmine.createSpy().and.returnValue(false);

        wrapBlockStep1(result, parent, para, createQuote, canMerge as any);

        expect(parent).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'Quote',
                    format: {},
                    quoteSegmentFormat: {},
                    blocks: [para],
                },
            ],
        });
        expect(result).toEqual([
            {
                parent: parent,
                wrapper: {
                    blockType: 'BlockGroup',
                    blockGroupType: 'Quote',
                    format: {},
                    quoteSegmentFormat: {},
                    blocks: [para],
                },
            },
        ]);
        expect(canMerge).toHaveBeenCalledTimes(1);
        expect(para.isImplicit).toBeFalse();
    });

    it('Can merge', () => {
        const result: WrapBlockStep1Result<ContentModelQuote>[] = [
            { parent: null!, wrapper: null! },
        ];
        const para1: ContentModelParagraph = {
            blockType: 'Paragraph',
            segments: [],
            format: {},
            isImplicit: true,
        };
        const para2: ContentModelParagraph = {
            blockType: 'Paragraph',
            segments: [],
            format: { backgroundColor: 'red' },
            isImplicit: true,
        };
        const quote: ContentModelQuote = {
            blockType: 'BlockGroup',
            blockGroupType: 'Quote',
            blocks: [para1],
            format: {},
            quoteSegmentFormat: {},
        };
        const parent: ContentModelDocument = {
            blockGroupType: 'Document',
            blocks: [quote, para2],
        };
        const canMerge = jasmine.createSpy().and.returnValue(true);

        wrapBlockStep1(result, parent, para2, createQuote, canMerge as any);

        expect(parent).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'Quote',
                    format: {},
                    quoteSegmentFormat: {},
                    blocks: [para1, para2],
                },
            ],
        });
        expect(result).toEqual([
            {
                parent: parent,
                wrapper: {
                    blockType: 'BlockGroup',
                    blockGroupType: 'Quote',
                    format: {},
                    quoteSegmentFormat: {},
                    blocks: [para1, para2],
                },
            },
            { parent: null!, wrapper: null! },
        ]);
        expect(canMerge).toHaveBeenCalledTimes(1);
        expect(canMerge).toHaveBeenCalledTimes(1);
        expect(para1.isImplicit).toBeTrue();
        expect(para2.isImplicit).toBeFalse();
    });
});

describe('wrapBlockStep2', () => {
    it('empty result', () => {
        const result: WrapBlockStep1Result<ContentModelQuote>[] = [];
        const canMerge = jasmine.createSpy().and.returnValue(true);

        wrapBlockStep2(result, canMerge as any);

        expect(result).toEqual([]);
        expect(canMerge).not.toHaveBeenCalled();
    });

    it('Has result, invalid parent', () => {
        const quote: ContentModelQuote = createQuote();
        const doc: ContentModelDocument = {
            blockGroupType: 'Document',
            blocks: [],
        };
        const result: WrapBlockStep1Result<ContentModelQuote>[] = [
            {
                parent: doc,
                wrapper: quote,
            },
        ];
        const canMerge = jasmine.createSpy().and.returnValue(false);

        wrapBlockStep2(result, canMerge as any);

        expect(result).toEqual([
            {
                parent: doc,
                wrapper: quote,
            },
        ]);
        expect(canMerge).not.toHaveBeenCalled();
        expect(doc).toEqual({
            blockGroupType: 'Document',
            blocks: [],
        });
    });

    it('Has result, no block to merge', () => {
        const quote: ContentModelQuote = createQuote();
        const doc: ContentModelDocument = {
            blockGroupType: 'Document',
            blocks: [quote],
        };
        const result: WrapBlockStep1Result<ContentModelQuote>[] = [
            {
                parent: doc,
                wrapper: quote,
            },
        ];
        const canMerge = jasmine.createSpy().and.returnValue(false);

        wrapBlockStep2(result, canMerge as any);

        expect(result).toEqual([
            {
                parent: doc,
                wrapper: quote,
            },
        ]);
        expect(doc).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'Quote',
                    blocks: [],
                    format: {},
                    quoteSegmentFormat: {},
                },
            ],
        });
        expect(canMerge).toHaveBeenCalledTimes(1);
        expect(canMerge).toHaveBeenCalledWith(undefined, quote);
    });

    it('Has results, can merge', () => {
        const quote1: ContentModelQuote = createQuote({ backgroundColor: 'red' });
        const quote2: ContentModelQuote = createQuote({ backgroundColor: 'green' });
        const quote3: ContentModelQuote = createQuote({ backgroundColor: 'blue' });
        const quote4: ContentModelQuote = createQuote({ backgroundColor: 'yellow' });
        const para1: ContentModelParagraph = createParagraph(true, { backgroundColor: 'red' });
        const para2: ContentModelParagraph = createParagraph(true, { backgroundColor: 'green' });
        const para3: ContentModelParagraph = createParagraph(true, { backgroundColor: 'blue' });
        const para4: ContentModelParagraph = createParagraph(true, { backgroundColor: 'yellow' });
        const doc: ContentModelDocument = {
            blockGroupType: 'Document',
            blocks: [quote1, quote2, quote3, quote4],
        };

        quote1.blocks.push(para1);
        quote2.blocks.push(para2);
        quote3.blocks.push(para3);
        quote4.blocks.push(para4);

        const result: WrapBlockStep1Result<ContentModelQuote>[] = [
            {
                parent: doc,
                wrapper: quote3,
            },
            {
                parent: doc,
                wrapper: quote1,
            },
        ];
        const canMerge = jasmine.createSpy().and.returnValue(true);

        wrapBlockStep2(result, canMerge as any);

        expect(canMerge).toHaveBeenCalledTimes(2);
        expect(canMerge).toHaveBeenCalledWith(quote4, quote3);
        expect(canMerge).toHaveBeenCalledWith(quote2, quote1);
        expect(doc).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'Quote',
                    blocks: [
                        {
                            blockType: 'Paragraph',
                            segments: [],
                            format: {
                                backgroundColor: 'red',
                            },
                            isImplicit: false,
                        },
                        {
                            blockType: 'Paragraph',
                            segments: [],
                            format: {
                                backgroundColor: 'green',
                            },
                            isImplicit: true,
                        },
                    ],
                    format: {
                        backgroundColor: 'red',
                    },
                    quoteSegmentFormat: {},
                },
                {
                    blockType: 'BlockGroup',
                    blockGroupType: 'Quote',
                    blocks: [
                        {
                            blockType: 'Paragraph',
                            segments: [],
                            format: {
                                backgroundColor: 'blue',
                            },
                            isImplicit: false,
                        },
                        {
                            blockType: 'Paragraph',
                            segments: [],
                            format: {
                                backgroundColor: 'yellow',
                            },
                            isImplicit: true,
                        },
                    ],
                    format: {
                        backgroundColor: 'blue',
                    },
                    quoteSegmentFormat: {},
                },
            ],
        });
    });
});
