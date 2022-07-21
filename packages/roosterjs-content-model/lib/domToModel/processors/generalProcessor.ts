import { BlockDisplay } from '../defaultStyles/BlockDisplay';
import { ElementProcessor } from './ElementProcessor';
import { knownBlockProcessor } from './knownBlockProcessor';
import { knownSegmentProcessor } from './knownSegmentProcessor';

/**
 * @internal
 */
export const generalProcessor: ElementProcessor = (group, element, context, defaultStyle) => {
    const processor =
        BlockDisplay.indexOf(element.style.display || defaultStyle.display!) >= 0
            ? knownBlockProcessor
            : knownSegmentProcessor;

    processor(group, element, context, defaultStyle);
};
