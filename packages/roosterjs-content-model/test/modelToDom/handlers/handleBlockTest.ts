import * as handleParagraph from '../../../lib/modelToDom/handlers/handleParagraph';
import { ContentModelBlock } from '../../../lib/publicTypes/block/ContentModelBlock';
import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { createFormatContext } from '../../../lib/formatHandlers/createFormatContext';
import { FormatContext } from '../../../lib/formatHandlers/FormatContext';
import { handleBlock } from '../../../lib/modelToDom/handlers/handleBlock';
import { SelectionInfo } from '../../../lib/modelToDom/types/SelectionInfo';

describe('handleBlock', () => {
    let parent: HTMLElement;
    let context: FormatContext;
    let selectionInfo: SelectionInfo;

    beforeEach(() => {
        context = createFormatContext();
        selectionInfo = {
            context: {
                currentBlockNode: null,
                currentSegmentNode: null,
            },
        };
        spyOn(handleParagraph, 'handleParagraph');
    });

    function runTest(block: ContentModelBlock, expectedInnerHTML: string) {
        parent = document.createElement('div');

        handleBlock(document, parent, block, context, selectionInfo);

        expect(parent.innerHTML).toBe(expectedInnerHTML);
    }

    it('Paragraph', () => {
        const paragraph: ContentModelBlock = {
            blockType: ContentModelBlockType.Paragraph,
            segments: [],
            format: {},
        };

        runTest(paragraph, '');

        expect(handleParagraph.handleParagraph).toHaveBeenCalledTimes(1);
        expect(handleParagraph.handleParagraph).toHaveBeenCalledWith(
            document,
            parent,
            paragraph,
            context,
            selectionInfo
        );
    });

    it('General block without child', () => {
        const element = document.createElement('span');
        const block: ContentModelBlock = {
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            blocks: [],
            element: element,
        };

        runTest(block, '<span></span>');

        expect(handleParagraph.handleParagraph).toHaveBeenCalledTimes(0);
    });

    it('General block with 1 child', () => {
        const element = document.createElement('span');
        const paragraph: ContentModelBlock = {
            blockType: ContentModelBlockType.Paragraph,
            segments: [],
            format: {},
        };
        const block: ContentModelBlock = {
            blockType: ContentModelBlockType.BlockGroup,
            blockGroupType: ContentModelBlockGroupType.General,
            blocks: [paragraph],
            element: element,
        };

        runTest(block, '<span></span>');

        expect(handleParagraph.handleParagraph).toHaveBeenCalledTimes(1);
        expect(handleParagraph.handleParagraph).toHaveBeenCalledWith(
            document,
            element,
            paragraph,
            context,
            selectionInfo
        );
    });
});
