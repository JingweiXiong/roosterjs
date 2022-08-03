import { ContentModelBr } from '../../publicTypes/segment/ContentModelBr';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { DomToModelContext } from '../../domToModel/context/DomToModelContext';

/**
 * @internal
 */
export function createBr(context: DomToModelContext): ContentModelBr {
    return {
        segmentType: ContentModelSegmentType.Br,
        format: context.segmentFormat,
    };
}
