import { BlockDisplay } from '../defaultStyles/BlockDisplay';
import { ElementProcessor } from './ElementProcessor';
import { getDefaultStyle } from '../defaultStyles/getDefaultStyle';
import { knownBlockProcessor } from './knownBlockProcessor';
import { knownSegmentProcessor } from './knownSegmentProcessor';

/**
 * @internal
 */
export const generalProcessor: ElementProcessor = (group, element, context) => {
    const processor =
        BlockDisplay.indexOf(element.style.display || getDefaultStyle(element).display!) >= 0
            ? knownBlockProcessor
            : knownSegmentProcessor;

    processor(group, element, context);
};
