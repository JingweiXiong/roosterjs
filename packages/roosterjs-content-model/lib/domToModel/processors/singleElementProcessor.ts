import { BlockDisplay } from '../defaultStyles/BlockDisplay';
import { ElementProcessor } from './ElementProcessor';
import { generalBlockProcessor } from './generalBlockProcessor';
import { generalSegmentProcessor } from './generalSegmentProcessor';
import { getDefaultStyle } from '../defaultStyles/getDefaultStyle';
import { getProcessor } from './getProcessor';

/**
 * @internal
 * @param group
 * @param element
 * @param context
 */
export const singleElementProcessor: ElementProcessor = (group, element, context) => {
    const defaultStyle = getDefaultStyle(element);
    const processor =
        getProcessor(element.tagName) ||
        (BlockDisplay.indexOf(element.style.display || defaultStyle.display || '') >= 0
            ? generalBlockProcessor
            : generalSegmentProcessor);

    processor(group, element, context, defaultStyle);
};
