import { addSegment } from '../utils/addSegment';
import { containerProcessor } from './containerProcessor';
import { createGeneralSegment } from '../creators/createGeneralSegment';
import { ElementProcessor } from './ElementProcessor';

/**
 * @internal
 */
export const generalSegmentProcessor: ElementProcessor = (group, context, element) => {
    const segment = createGeneralSegment(context, element);
    const originalSegmentFormat = context.segmentFormat;

    context.segmentFormat = {};

    addSegment(group, context, segment);
    containerProcessor(segment, element, context);

    context.segmentFormat = originalSegmentFormat;
};
