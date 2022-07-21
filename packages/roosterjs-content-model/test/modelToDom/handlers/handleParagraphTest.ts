import * as handleSegment from '../../../lib/modelToDom/handlers/handleSegment';
import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { ContentModelParagraph } from '../../../lib/publicTypes/block/ContentModelParagraph';
import { ContentModelSegment } from '../../../lib/publicTypes/segment/ContentModelSegment';
import { ContentModelSegmentType } from '../../../lib/publicTypes/enum/SegmentType';
import { createFormatContext } from '../../../lib/formatHandlers/createFormatContext';
import { FormatContext } from '../../../lib/formatHandlers/FormatContext';
import { handleParagraph } from '../../../lib/modelToDom/handlers/handleParagraph';
import { SelectionInfo } from '../../../lib/modelToDom/types/SelectionInfo';

describe('handleParagraph', () => {
    let parent: HTMLElement;
    let context: FormatContext;
    let selectionInfo: SelectionInfo;

    beforeEach(() => {
        spyOn(handleSegment, 'handleSegment');
        parent = document.createElement('div');
        context = createFormatContext();
        selectionInfo = {
            context: {
                currentBlockNode: null,
                currentSegmentNode: null,
            },
        };
    });

    function runTest(
        paragraph: ContentModelParagraph,
        expectedInnerHTML: string,
        expectedCreateSegmentFromContentCalledTimes: number
    ) {
        handleParagraph(document, parent, paragraph, context, selectionInfo);

        expect(parent.innerHTML).toBe(expectedInnerHTML);
        expect(handleSegment.handleSegment).toHaveBeenCalledTimes(
            expectedCreateSegmentFromContentCalledTimes
        );
    }

    it('Handle empty explicit paragraph', () => {
        runTest(
            {
                blockType: ContentModelBlockType.Paragraph,
                segments: [],
                format: {},
            },
            '<div></div>',
            0
        );
    });

    it('Handle empty implicit paragraph', () => {
        runTest(
            {
                blockType: ContentModelBlockType.Paragraph,
                segments: [],
                isImplicit: true,
                format: {},
            },
            '',
            0
        );
    });

    it('Handle paragraph with single text segment', () => {
        const segment: ContentModelSegment = {
            segmentType: ContentModelSegmentType.Text,
            text: 'test',
            format: {},
        };
        runTest(
            {
                blockType: ContentModelBlockType.Paragraph,
                segments: [segment],
                format: {},
            },
            '<div></div>',
            1
        );

        expect(handleSegment.handleSegment).toHaveBeenCalledWith(
            document,
            parent.firstChild as HTMLElement,
            segment,
            context,
            selectionInfo
        );
    });

    it('Handle implicit paragraph single text segment', () => {
        const segment: ContentModelSegment = {
            segmentType: ContentModelSegmentType.Text,
            text: 'test',
            format: {},
        };
        runTest(
            {
                blockType: ContentModelBlockType.Paragraph,
                segments: [segment],
                isImplicit: true,
                format: {},
            },
            '',
            1
        );

        expect(handleSegment.handleSegment).toHaveBeenCalledWith(
            document,
            parent,
            segment,
            context,
            selectionInfo
        );
    });

    it('Handle multiple segments', () => {
        const segment1: ContentModelSegment = {
            segmentType: ContentModelSegmentType.Text,
            text: 'test',
            format: {},
        };
        const segment2: ContentModelSegment = {
            segmentType: ContentModelSegmentType.General,
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            blocks: [],
            element: null!,
            format: {},
        };
        runTest(
            {
                blockType: ContentModelBlockType.Paragraph,
                segments: [segment1, segment2],
                format: {},
            },
            '<div></div>',
            2
        );

        expect(handleSegment.handleSegment).toHaveBeenCalledWith(
            document,
            parent.firstChild as HTMLElement,
            segment1,
            context,
            selectionInfo
        );
        expect(handleSegment.handleSegment).toHaveBeenCalledWith(
            document,
            parent.firstChild as HTMLElement,
            segment2,
            context,
            selectionInfo
        );
    });
});
