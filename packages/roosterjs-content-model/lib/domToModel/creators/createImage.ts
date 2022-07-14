import { ContentModelImage } from '../../publicTypes/segment/ContentModelImage';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export function createImage(context: FormatContext, img: HTMLImageElement): ContentModelImage {
    const result: ContentModelImage = {
        segmentType: ContentModelSegmentType.Image,
        format: context.segmentFormat,
        src: img.src,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
