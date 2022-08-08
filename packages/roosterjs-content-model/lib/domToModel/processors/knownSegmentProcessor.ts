import { containerProcessor } from './containerProcessor';
import { ElementProcessor } from './ElementProcessor';
import { getDefaultStyle } from '../defaultStyles/getDefaultStyle';
import { SegmentFormatHandlers } from '../../formatHandlers/SegmentFormatHandlers';

/**
 * @internal
 */
export const knownSegmentProcessor: ElementProcessor = (group, element, context) => {
    const originalSegmentFormat = context.segmentFormat;
    const defaultStyle = getDefaultStyle(element);

    context.segmentFormat = { ...originalSegmentFormat };
    SegmentFormatHandlers.forEach(handler =>
        handler.parse(context.segmentFormat, element, context.contentModelContext, defaultStyle)
    );

    containerProcessor(group, element, context);

    context.segmentFormat = originalSegmentFormat;
};
