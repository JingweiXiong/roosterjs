import { ElementProcessor } from './ElementProcessor';
import { getProcessor } from './getProcessor';

/**
 * @internal
 * @param group
 * @param element
 * @param context
 */
export const singleElementProcessor: ElementProcessor = (group, element, context) => {
    const processor = getProcessor(element);
    processor(group, element, context);
};
