import { addSegment } from '../utils/addSegment';
import { createImage } from '../creators/createImage';
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
        handler.parse(context.segmentFormat, imageElement, context, defaultStyle)
    );

    addSegment(group, createImage(imageElement, context), context);

    context.segmentFormat = originalSegmentFormat;
};
