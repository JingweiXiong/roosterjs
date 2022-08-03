import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { ContentModelSelectionMarker } from '../../publicTypes/segment/ContentModelSelectionMarker';
import { DomToModelContext } from '../../domToModel/context/DomToModelContext';

/**
 * @internal
 */
export function createSelectionMarker(context: DomToModelContext): ContentModelSelectionMarker {
    return {
        segmentType: ContentModelSegmentType.SelectionMarker,
        isSelected: true,
        format: context.segmentFormat,
    };
}
