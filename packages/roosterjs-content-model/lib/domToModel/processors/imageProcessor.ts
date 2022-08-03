import { addSegment } from '../../modelApi/common/addSegment';
import { createImage } from '../../modelApi/creators/createImage';
import { ElementProcessor } from './ElementProcessor';
import { SegmentFormatHandlers } from '../../formatHandlers/SegmentFormatHandlers';

/**
 * @internal
 */
export const imageProcessor: ElementProcessor = (group, element, context, defaultStyle) => {
    const imageElement = element as HTMLImageElement;

    const originalSegmentFormat = context.segmentFormat;
    context.segmentFormat = { ...originalSegmentFormat };

    SegmentFormatHandlers.forEach(handler =>
        handler.parse(
            context.segmentFormat,
            imageElement,
            context.contentModelContext,
            defaultStyle
        )
    );

    const image = createImage(imageElement, context.segmentFormat);

    if (context.isInSelection) {
        image.isSelected = true;
    }

    addSegment(group, image, context.blockFormat);

    context.segmentFormat = originalSegmentFormat;
};
