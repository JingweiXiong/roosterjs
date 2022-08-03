import * as handleBlock from '../../../lib/modelToDom/handlers/handleBlock';
import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { ContentModelSegment } from '../../../lib/publicTypes/segment/ContentModelSegment';
import { ContentModelSegmentType } from '../../../lib/publicTypes/enum/SegmentType';
import { createDomToModelContext } from '../../../lib/domToModel/context/createDomToModelContext';
import { DomToModelContext } from '../../../lib/domToModel/context/DomToModelContext';
import { handleSegment } from '../../../lib/modelToDom/handlers/handleSegment';
import { SelectionInfo } from '../../../lib/modelToDom/types/SelectionInfo';

describe('handleSegment', () => {
    let parent: HTMLElement;
    let context: DomToModelContext;
    let selectionInfo: SelectionInfo;

    beforeEach(() => {
        spyOn(handleBlock, 'handleBlock');
        context = createDomToModelContext();
        selectionInfo = {
            context: {
                currentBlockNode: null,
                currentSegmentNode: null,
            },
        };
    });

    function runTest(
        segment: ContentModelSegment,
        expectedInnerHTML: string,
        expectedCreateBlockFromContentModelCalledTimes: number
    ) {
        parent = document.createElement('div');

        handleSegment(document, parent, segment, context, selectionInfo);

        expect(parent.innerHTML).toBe(expectedInnerHTML);
        expect(handleBlock.handleBlock).toHaveBeenCalledTimes(
            expectedCreateBlockFromContentModelCalledTimes
        );
    }

    it('Text segment', () => {
        runTest(
            {
                segmentType: ContentModelSegmentType.Text,
                text: 'test',
                format: {},
            },
            '<span>test</span>',
            0
        );
    });

    it('Br segment', () => {
        runTest(
            {
                segmentType: ContentModelSegmentType.Br,
                format: {},
            },
            '<br>',
            0
        );
    });

    it('general segment', () => {
        const segment: ContentModelSegment = {
            segmentType: ContentModelSegmentType.General,
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            blocks: [],
            element: null!,
            format: {},
        };
        runTest(segment, '', 1);
        expect(handleBlock.handleBlock).toHaveBeenCalledWith(
            document,
            parent,
            segment,
            context,
            selectionInfo
        );
    });
});
