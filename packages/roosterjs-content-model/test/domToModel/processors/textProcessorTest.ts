import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';
import { textProcessor } from '../../../lib/domToModel/processors/textProcessor';

describe('textProcessor', () => {
    it('Empty group', () => {
        const doc = createContentModelDocument(document);
        textProcessor(doc, 'test');

        expect(doc).toEqual({
            blockType: 'BlockGroup',
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'Paragraph',
                    isImplicit: true,
                    segments: [
                        {
                            segmentType: 'Text',
                            text: 'test',
                        },
                    ],
                },
            ],
            document: document,
        });
    });

    it('Group with empty paragraph', () => {
        const doc = createContentModelDocument(document);
        doc.blocks.push({
            blockType: 'Paragraph',
            segments: [],
        });

        textProcessor(doc, 'test');

        expect(doc).toEqual({
            blockType: 'BlockGroup',
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'Paragraph',
                    segments: [
                        {
                            segmentType: 'Text',
                            text: 'test',
                        },
                    ],
                },
            ],
            document: document,
        });
    });

    it('Group with paragraph with text segment', () => {
        const doc = createContentModelDocument(document);
        doc.blocks.push({
            blockType: 'Paragraph',
            segments: [
                {
                    segmentType: 'Text',
                    text: 'test0',
                },
            ],
        });

        textProcessor(doc, 'test1');

        expect(doc).toEqual({
            blockType: 'BlockGroup',
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'Paragraph',
                    segments: [
                        {
                            segmentType: 'Text',
                            text: 'test0test1',
                        },
                    ],
                },
            ],
            document: document,
        });
    });

    it('Group with paragraph with different type of segment', () => {
        const doc = createContentModelDocument(document);
        doc.blocks.push({
            blockType: 'Paragraph',
            segments: [
                {
                    segmentType: 'General',
                    blockType: 'BlockGroup',
                    blockGroupType: 'General',
                    element: null!,
                    blocks: [],
                },
            ],
        });

        textProcessor(doc, 'test');

        expect(doc).toEqual({
            blockType: 'BlockGroup',
            blockGroupType: 'Document',
            blocks: [
                {
                    blockType: 'Paragraph',
                    segments: [
                        {
                            segmentType: 'General',
                            blockType: 'BlockGroup',
                            blockGroupType: 'General',
                            element: null!,
                            blocks: [],
                        },
                        {
                            segmentType: 'Text',
                            text: 'test',
                        },
                    ],
                },
            ],
            document: document,
        });
    });
});
