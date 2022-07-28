import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { ContentModelSegmentType } from '../../../lib/publicTypes/enum/SegmentType';
import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';
import { createFormatContext } from '../../../lib/formatHandlers/createFormatContext';
import { createGeneralBlock } from '../../../lib/domToModel/creators/createGeneralBlock';
import { createGeneralSegment } from '../../../lib/domToModel/creators/createGeneralSegment';
import { createParagraph } from '../../../lib/domToModel/creators/createParagraph';
import { createSelectionMarker } from '../../../lib/domToModel/creators/createSelectionMarker';
import { createTable } from '../../../lib/domToModel/creators/createTable';
import { createTableCell } from '../../../lib/domToModel/creators/createTableCell';
import { createText } from '../../../lib/domToModel/creators/createText';
import { FormatContext } from '../../../lib/formatHandlers/FormatContext';

describe('Creators', () => {
    let context: FormatContext;

    beforeEach(() => {
        context = createFormatContext();
    });

    it('createContentModelDocument', () => {
        const result = createContentModelDocument(document);

        expect(result).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.Document,
            blocks: [],
            document: document,
        });
    });

    it('createGeneralBlock', () => {
        const element = document.createElement('div');
        const result = createGeneralBlock(element);

        expect(result).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            element: element,
            blocks: [],
        });
    });

    it('createGeneralSegment', () => {
        const element = document.createElement('div');
        const result = createGeneralSegment(element, context);

        expect(result).toEqual({
            segmentType: ContentModelSegmentType.General,
            blocks: [],
            element: element,
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            format: {},
        });
    });

    it('createGeneralSegment with selection', () => {
        context.isInSelection = true;

        const element = document.createElement('div');
        const result = createGeneralSegment(element, context);

        expect(result).toEqual({
            segmentType: ContentModelSegmentType.General,
            blocks: [],
            element: element,
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            isSelected: true,
            format: {},
        });
    });

    it('createGeneralSegment with selection', () => {
        context.isInSelection = true;

        const element = document.createElement('div');
        const result = createGeneralSegment(element, context);

        expect(result).toEqual({
            segmentType: ContentModelSegmentType.General,
            blocks: [],
            element: element,
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            isSelected: true,
        });
    });

    it('createParagraph - not dummy block', () => {
        const result = createParagraph(false, context);

        expect(result).toEqual({
            blockType: ContentModelBlockType.Paragraph,
            segments: [],
            format: {},
        });
    });

    it('createParagraph - dummy block', () => {
        const result = createParagraph(true, context);

        expect(result).toEqual({
            blockType: ContentModelBlockType.Paragraph,
            segments: [],
            format: {},
            isImplicit: true,
        });
    });

    it('createText', () => {
        const text = 'test';
        const result = createText(text, context);

        expect(result).toEqual({
            segmentType: ContentModelSegmentType.Text,
            format: {},
            text: text,
        });
    });

    it('createText with selection', () => {
        context.isInSelection = true;

        const text = 'test';
        const result = createText(text, context);

        expect(result).toEqual({
            segmentType: ContentModelSegmentType.Text,
            text: text,

            isSelected: true,
            format: {},
        });
    });

    it('createText with selection', () => {
        context.isInSelection = true;

        const text = 'test';
        const result = createText(text, context);

        expect(result).toEqual({
            segmentType: ContentModelSegmentType.Text,
            text: text,

            isSelected: true,
        });
    });

    it('createTable', () => {
        const tableModel = createTable(2);

        expect(tableModel).toEqual({
            blockType: ContentModelBlockType.Table,
            cells: [[], []],
            format: {},
        });
    });

    it('createTableCell from Table Cell - no span', () => {
        const tdModel = createTableCell(1 /*colSpan*/, 1 /*rowSpan*/, false /*isHeader*/, context);
        expect(tdModel).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.TableCell,
            blocks: [],
            spanLeft: false,
            spanAbove: false,
            isHeader: false,
            format: {},
        });
    });

    it('createTableCell from Table Cell - span left', () => {
        const tdModel = createTableCell(2 /*colSpan*/, 1 /*rowSpan*/, false /*isHeader*/, context);
        expect(tdModel).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.TableCell,
            blocks: [],
            spanLeft: true,
            spanAbove: false,
            isHeader: false,
            format: {},
        });
    });

    it('createTableCell from Table Cell - span above', () => {
        const tdModel = createTableCell(1 /*colSpan*/, 3 /*rowSpan*/, false /*isHeader*/, context);
        expect(tdModel).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.TableCell,
            blocks: [],
            spanLeft: false,
            spanAbove: true,
            isHeader: false,
            format: {},
        });
    });

    it('createTableCell from Table Header', () => {
        const tdModel = createTableCell(1 /*colSpan*/, 1 /*rowSpan*/, true /*isHeader*/, context);
        expect(tdModel).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.TableCell,
            blocks: [],
            spanLeft: false,
            spanAbove: false,
            isHeader: true,
            format: {},
        });
    });

    it('createTableCell with selection', () => {
        context.isInSelection = true;

        const tdModel = createTableCell(1 /*colSpan*/, 1 /*rowSpan*/, true /*isHeader*/, context);
        expect(tdModel).toEqual({
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.TableCell,
            blocks: [],
            spanLeft: false,
            spanAbove: false,
            isHeader: true,
            format: {},
            isSelected: true,
        });
    });

    it('createSelectionMarker', () => {
        const marker = createSelectionMarker(context);

        expect(marker).toEqual({
            segmentType: ContentModelSegmentType.SelectionMarker,
            isSelected: true,
            format: {},
        });
    });
});
