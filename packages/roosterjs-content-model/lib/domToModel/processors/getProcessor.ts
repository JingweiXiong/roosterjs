import { BlockDisplay } from '../defaultStyles/BlockDisplay';
import { brProcessor } from './brProcessor';
import { ElementProcessor } from './ElementProcessor';
import { generalBlockProcessor } from './generalBlockProcessor';
import { generalSegmentProcessor } from './generalSegmentProcessor';
import { getDefaultStyle } from '../defaultStyles/getDefaultStyle';
import { imageProcessor } from './imageProcessor';
import { knownBlockProcessor } from './knownBlockProcessor';
import { knownSegmentProcessor } from './knownSegmentProcessor';
import { tableProcessor } from './tableProcessor';

const dummyProcessor: ElementProcessor = () => {};

const ProcessorMap: Record<string, ElementProcessor> = {
    A: dummyProcessor,
    ADDRESS: dummyProcessor,
    ARTICLE: dummyProcessor,
    ASIDE: dummyProcessor,
    B: dummyProcessor,
    BODY: dummyProcessor, // TODO
    BLOCKQUOTE: dummyProcessor, // TODO
    BR: brProcessor,
    CENTER: dummyProcessor,
    CODE: dummyProcessor, // TODO
    DIV: dummyProcessor,
    DD: dummyProcessor, // TODO
    DL: dummyProcessor, // TODO
    DT: dummyProcessor, // TODO
    EM: dummyProcessor,
    FONT: dummyProcessor,
    FIELDSET: dummyProcessor, // TODO
    FIGURE: dummyProcessor, // TODO
    FIGCAPTION: dummyProcessor, // TODO
    FOOTER: dummyProcessor, // TODO
    FORM: dummyProcessor, // TODO
    I: dummyProcessor,
    IMG: imageProcessor,
    H1: dummyProcessor, // TODO
    H2: dummyProcessor, // TODO
    H3: dummyProcessor, // TODO
    H4: dummyProcessor, // TODO
    H5: dummyProcessor, // TODO
    H6: dummyProcessor, // TODO
    HEADER: dummyProcessor, // TODO
    HR: dummyProcessor, // TODO
    // LI: generalProcessor, // TODO
    MAIN: dummyProcessor, // TODO
    NAV: dummyProcessor, // TODO
    // OL: generalProcessor, // TODO
    P: dummyProcessor,
    PRE: dummyProcessor,
    S: dummyProcessor,
    SECTION: dummyProcessor,
    SPAN: dummyProcessor,
    STRIKE: dummyProcessor,
    STRONG: dummyProcessor,
    SUB: dummyProcessor,
    SUP: dummyProcessor,
    TABLE: tableProcessor,
    TD: dummyProcessor, // TODO
    TBODY: dummyProcessor, // TODO
    TFOOT: dummyProcessor, // TODO
    TH: dummyProcessor, // TODO
    U: dummyProcessor,
    // UL: generalProcessor, // TODO
    VIDEO: dummyProcessor, // TODO
};

/**
 * @internal
 */
export function getProcessor(element: HTMLElement): ElementProcessor {
    const processor = ProcessorMap[element.tagName];
    const isBlock =
        BlockDisplay.indexOf(element.style.display || getDefaultStyle(element).display!) >= 0;

    if (processor == dummyProcessor) {
        return isBlock ? knownBlockProcessor : knownSegmentProcessor;
    } else if (!processor) {
        return isBlock ? generalBlockProcessor : generalSegmentProcessor;
    } else {
        return processor;
    }
}
