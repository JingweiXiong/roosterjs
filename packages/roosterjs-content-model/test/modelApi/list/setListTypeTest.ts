import { createContentModelDocument } from '../../../lib/modelApi/creators/createContentModelDocument';
import { createListItem } from '../../../lib/modelApi/creators/createListItem';
import { createParagraph } from '../../../lib/modelApi/creators/createParagraph';
import { createQuote } from '../../../lib/modelApi/creators/createQuote';
import { createText } from '../../../lib/modelApi/creators/createText';
import { setListType } from '../../../lib/modelApi/list/setListType';

describe('indent', () => {
    it('Empty group', () => {
        const group = createContentModelDocument();

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [],
        });
        expect(result).toBeFalse();
    });

    it('Group without selection', () => {
        const group = createContentModelDocument();
        const para = createParagraph();

        group.blocks.push(para);

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [para],
        });
        expect(result).toBeFalse();
    });

    it('Group with single paragraph selection', () => {
        const group = createContentModelDocument();
        const para = createParagraph();
        const text = createText('test');

        para.segments.push(text);
        group.blocks.push(para);

        text.isSelected = true;

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockGroupType: 'ListItem',
                    blockType: 'BlockGroup',
                    levels: [
                        {
                            listType: 'OL',
                            startNumberOverride: 1,
                            direction: undefined,
                            textAlign: undefined,
                        },
                    ],
                    blocks: [para],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        format: {
                            fontFamily: undefined,
                            fontSize: undefined,
                            textColor: undefined,
                        },
                        isSelected: true,
                    },
                    format: {},
                },
            ],
        });
        expect(result).toBeTrue();
        expect(para).toEqual({
            blockType: 'Paragraph',
            format: {},
            isImplicit: true,
            segments: [
                {
                    segmentType: 'Text',
                    text: 'test',
                    format: {},
                    isSelected: true,
                },
            ],
        });
    });

    it('Group with single list item selection in a different type', () => {
        const group = createContentModelDocument();
        const para = createParagraph();
        const text = createText('test');
        const listItem = createListItem([{ listType: 'UL' }]);

        para.segments.push(text);
        listItem.blocks.push(para);
        group.blocks.push(listItem);

        text.isSelected = true;

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockGroupType: 'ListItem',
                    blockType: 'BlockGroup',
                    levels: [{ listType: 'OL' }],
                    blocks: [para],
                    formatHolder: { segmentType: 'SelectionMarker', format: {}, isSelected: true },
                    format: {},
                },
            ],
        });
        expect(result).toBeTrue();
    });

    it('Group with single list item selection in same type', () => {
        const group = createContentModelDocument();
        const para = createParagraph();
        const text = createText('test');
        const listItem = createListItem([{ listType: 'OL' }]);

        para.segments.push(text);
        listItem.blocks.push(para);
        group.blocks.push(listItem);

        text.isSelected = true;

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockGroupType: 'ListItem',
                    blockType: 'BlockGroup',
                    levels: [],
                    blocks: [para],
                    formatHolder: { segmentType: 'SelectionMarker', format: {}, isSelected: true },
                    format: {},
                },
            ],
        });
        expect(result).toBeTrue();
    });

    it('Group with single list item selection in same type with implicit paragraph', () => {
        const group = createContentModelDocument();
        const para = createParagraph();
        const text = createText('test');
        const listItem = createListItem([{ listType: 'OL' }]);

        para.isImplicit = true;
        para.segments.push(text);
        listItem.blocks.push(para);
        group.blocks.push(listItem);

        text.isSelected = true;

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockGroupType: 'ListItem',
                    blockType: 'BlockGroup',
                    levels: [],
                    blocks: [para],
                    formatHolder: { segmentType: 'SelectionMarker', format: {}, isSelected: true },
                    format: {},
                },
            ],
        });
        expect(result).toBeTrue();
        expect(para).toEqual({
            blockType: 'Paragraph',
            format: {},
            isImplicit: false,
            segments: [
                {
                    segmentType: 'Text',
                    format: {},
                    isSelected: true,
                    text: 'test',
                },
            ],
        });
    });

    it('Group with mixed selection', () => {
        const group = createContentModelDocument();
        const para1 = createParagraph();
        const para2 = createParagraph();
        const para3 = createParagraph();
        const text1 = createText('test1');
        const text2 = createText('test2');
        const text3 = createText('test3');
        const listItem1 = createListItem([{ listType: 'OL' }]);
        const listItem2 = createListItem([{ listType: 'OL' }, { listType: 'UL' }]);
        const quote = createQuote();

        para1.segments.push(text1);
        para2.segments.push(text2);
        para3.segments.push(text3);
        listItem1.blocks.push(para1);
        listItem2.blocks.push(para2);
        quote.blocks.push(para3);
        group.blocks.push(listItem1);
        group.blocks.push(listItem2);
        group.blocks.push(quote);

        text1.isSelected = true;
        text2.isSelected = true;
        text3.isSelected = true;

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockGroupType: 'ListItem',
                    blockType: 'BlockGroup',
                    levels: [{ listType: 'OL' }],
                    blocks: [para1],
                    formatHolder: { segmentType: 'SelectionMarker', format: {}, isSelected: true },
                    format: {},
                },
                {
                    blockGroupType: 'ListItem',
                    blockType: 'BlockGroup',
                    levels: [{ listType: 'OL' }, { listType: 'OL' }],
                    blocks: [para2],
                    formatHolder: { segmentType: 'SelectionMarker', format: {}, isSelected: true },
                    format: {},
                },
                {
                    blockGroupType: 'Quote',
                    blockType: 'BlockGroup',
                    blocks: [
                        {
                            blockGroupType: 'ListItem',
                            blockType: 'BlockGroup',
                            levels: [
                                {
                                    listType: 'OL',
                                    startNumberOverride: undefined,
                                    direction: undefined,
                                    textAlign: undefined,
                                },
                            ],
                            blocks: [para3],
                            formatHolder: {
                                segmentType: 'SelectionMarker',
                                format: {
                                    fontFamily: undefined,
                                    fontSize: undefined,
                                    textColor: undefined,
                                },
                                isSelected: true,
                            },
                            format: {},
                        },
                    ],
                    format: {},
                    quoteSegmentFormat: {},
                },
            ],
        });
        expect(result).toBeTrue();
    });

    it('Carry over existing segment and direction format', () => {
        const group = createContentModelDocument();
        const para = createParagraph(false, {
            direction: 'rtl',
            textAlign: 'start',
            backgroundColor: 'yellow',
        });
        const text = createText('test', {
            fontFamily: 'Arial',
            fontSize: '10px',
            textColor: 'black',
            backgroundColor: 'white',
            fontWeight: 'bold',
            italic: true,
            underline: true,
        });

        para.segments.push(text);
        group.blocks.push(para);

        text.isSelected = true;

        const result = setListType(group, 'OL');

        expect(group).toEqual({
            blockGroupType: 'Document',
            blocks: [
                {
                    blockGroupType: 'ListItem',
                    blockType: 'BlockGroup',
                    levels: [
                        {
                            listType: 'OL',
                            startNumberOverride: 1,
                            direction: 'rtl',
                            textAlign: 'start',
                        },
                    ],
                    blocks: [para],
                    formatHolder: {
                        segmentType: 'SelectionMarker',
                        format: {
                            fontFamily: 'Arial',
                            fontSize: '10px',
                            textColor: 'black',
                        },
                        isSelected: true,
                    },
                    format: {},
                },
            ],
        });
        expect(result).toBeTrue();
        expect(para).toEqual({
            blockType: 'Paragraph',
            format: { direction: 'rtl', textAlign: 'start', backgroundColor: 'yellow' },
            isImplicit: true,
            segments: [
                {
                    segmentType: 'Text',
                    text: 'test',
                    format: {
                        fontFamily: 'Arial',
                        fontSize: '10px',
                        textColor: 'black',
                        backgroundColor: 'white',
                        fontWeight: 'bold',
                        italic: true,
                        underline: true,
                    },
                    isSelected: true,
                },
            ],
        });
    });
});
