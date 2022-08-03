import { ContentModelImage } from '../../publicTypes/segment/ContentModelImage';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { DomToModelContext } from '../../domToModel/context/DomToModelContext';

/**
 * @internal
 */
export function createImage(img: HTMLImageElement, context: DomToModelContext): ContentModelImage {
    return {
        segmentType: ContentModelSegmentType.Image,
        format: context.segmentFormat,
        src: img.src,
    };
}
