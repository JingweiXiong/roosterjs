import * as handleBlock from '../../../lib/modelToDom/handlers/handleBlock';
import { ContentModelSegment } from '../../../lib/publicTypes/segment/ContentModelSegment';
import { createFormatContext } from '../../../lib/formatHandlers/createFormatContext';
import { FormatContext } from '../../../lib/formatHandlers/FormatContext';
import { handleSegment } from '../../../lib/modelToDom/handlers/handleSegment';

describe('handleSegment', () => {
    let parent: HTMLElement;
    let context: FormatContext;

    beforeEach(() => {
        spyOn(handleBlock, 'handleBlock');
        context = createFormatContext();
    });

    function runTest(
        segment: ContentModelSegment,
        expectedInnerHTML: string,
        expectedCreateBlockFromContentModelCalledTimes: number
    ) {
        parent = document.createElement('div');

        handleSegment(document, parent, segment, context);

        expect(parent.innerHTML).toBe(expectedInnerHTML);
        expect(handleBlock.handleBlock).toHaveBeenCalledTimes(
            expectedCreateBlockFromContentModelCalledTimes
        );
    }

    it('Text segment', () => {
        runTest(
            {
                segmentType: 'Text',
                text: 'test',
            },
            '<span>test</span>',
            0
        );
    });

    it('general segment', () => {
        const segment: ContentModelSegment = {
            segmentType: 'General',
            blockType: 'BlockGroup',
            blockGroupType: 'General',
            blocks: [],
            element: null!,
        };
        runTest(segment, '', 1);
        expect(handleBlock.handleBlock).toHaveBeenCalledWith(document, parent, segment, context);
    });
});
