import { ContentModelGeneralSegment } from '../../publicTypes/segment/ContentModelGeneralSegment';

/**
 * @internal
 */
export function createGeneralSegment(element: HTMLElement): ContentModelGeneralSegment {
    const result: ContentModelGeneralSegment = {
        blockType: 'BlockGroup',
        blockGroupType: 'General',
        segmentType: 'General',
        blocks: [],
        element: element,
    };

    return result;
}
