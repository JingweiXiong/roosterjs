import { addSegment } from '../utils/addSegment';
import { containerProcessor } from './containerProcessor';
import { createGeneralSegment } from '../creators/createGeneralSegment';
import { ElementProcessor } from './ElementProcessor';

/**
 * @internal
 */
export const generalSegmentProcessor: ElementProcessor = (group, element, context) => {
    const segment = createGeneralSegment(element, context);
    const originalSegmentFormat = context.segmentFormat;

    context.segmentFormat = {};

    addSegment(group, context, segment);
    containerProcessor(segment, element, context);

    context.segmentFormat = originalSegmentFormat;
};
