import { addBlock } from '../../modelApi/common/addBlock';
import { containerProcessor } from './containerProcessor';
import { createGeneralBlock } from '../../modelApi/creators/createGeneralBlock';
import { ElementProcessor } from './ElementProcessor';

/**
 * @internal
 */
export const generalBlockProcessor: ElementProcessor = (group, element, context) => {
    const block = createGeneralBlock(element);
    const originalBlockFormat = context.blockFormat;
    const originalSegmentFormat = context.segmentFormat;

    context.blockFormat = {};
    context.segmentFormat = {};

    addBlock(group, block);
    containerProcessor(block, element, context);

    context.blockFormat = originalBlockFormat;
    context.segmentFormat = originalSegmentFormat;
};
