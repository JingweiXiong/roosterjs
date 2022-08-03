import { ContentModelBr } from '../../publicTypes/segment/ContentModelBr';
import { ContentModelSegmentFormat } from '../../publicTypes/format/ContentModelSegmentFormat';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';

/**
 * @internal
 */
export function createBr(format?: ContentModelSegmentFormat): ContentModelBr {
    return {
        segmentType: ContentModelSegmentType.Br,
        format: format || {},
    };
}
