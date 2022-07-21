import { ContentModelBlockGroupType } from '../../publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelGeneralSegment } from '../../publicTypes/segment/ContentModelGeneralSegment';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { FormatContext } from '../../formatHandlers/FormatContext';

/**
 * @internal
 */
export function createGeneralSegment(
    context: FormatContext,
    element: HTMLElement
): ContentModelGeneralSegment {
    const result: ContentModelGeneralSegment = {
        blockType: ContentModelBlockType.BlockGroup,
        blockGroupType: ContentModelBlockGroupType.General,
        segmentType: ContentModelSegmentType.General,
        format: {},
        blocks: [],
        element: element,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
