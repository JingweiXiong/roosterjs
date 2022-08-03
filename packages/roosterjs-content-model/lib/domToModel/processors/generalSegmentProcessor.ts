import { addSegment } from '../../modelApi/common/addSegment';
import { containerProcessor } from './containerProcessor';
import { createGeneralSegment } from '../../modelApi/creators/createGeneralSegment';
import { ElementProcessor } from './ElementProcessor';

/**
 * @internal
 */
export const generalSegmentProcessor: ElementProcessor = (group, element, context) => {
    const segment = createGeneralSegment(element);
    const originalSegmentFormat = context.segmentFormat;

    if (context.isInSelection) {
        segment.isSelected = true;
    }

    context.segmentFormat = {};

    addSegment(group, segment, context);
    containerProcessor(segment, element, context);

    context.segmentFormat = originalSegmentFormat;
};
