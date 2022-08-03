import { ContentModelImage } from '../../publicTypes/segment/ContentModelImage';
import { ContentModelSegmentFormat } from '../../publicTypes/format/ContentModelSegmentFormat';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';

/**
 * @internal
 */
export function createImage(
    img: HTMLImageElement,
    format?: ContentModelSegmentFormat
): ContentModelImage {
    return {
        segmentType: ContentModelSegmentType.Image,
        format: format || {},
        src: img.src,
    };
}
