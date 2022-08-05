import { brProcessor } from './brProcessor';
import { ElementProcessor } from './ElementProcessor';
import { generalProcessor } from './generalProcessor';
import { imageProcessor } from './imageProcessor';
import { tableProcessor } from './tableProcessor';

const ProcessorMap: Record<string, ElementProcessor> = {
    A: generalProcessor,
    ADDRESS: generalProcessor,
    ARTICLE: generalProcessor,
    ASIDE: generalProcessor,
    B: generalProcessor,
    BODY: generalProcessor, // TODO
    BLOCKQUOTE: generalProcessor, // TODO
    BR: brProcessor,
    CENTER: generalProcessor,
    CODE: generalProcessor, // TODO
    DIV: generalProcessor,
    DD: generalProcessor, // TODO
    DL: generalProcessor, // TODO
    DT: generalProcessor, // TODO
    EM: generalProcessor,
    FONT: generalProcessor,
    FIELDSET: generalProcessor, // TODO
    FIGURE: generalProcessor, // TODO
    FIGCAPTION: generalProcessor, // TODO
    FOOTER: generalProcessor, // TODO
    FORM: generalProcessor, // TODO
    I: generalProcessor,
    IMG: imageProcessor,
    H1: generalProcessor, // TODO
    H2: generalProcessor, // TODO
    H3: generalProcessor, // TODO
    H4: generalProcessor, // TODO
    H5: generalProcessor, // TODO
    H6: generalProcessor, // TODO
    HEADER: generalProcessor, // TODO
    HR: generalProcessor, // TODO
    // LI: generalProcessor, // TODO
    MAIN: generalProcessor, // TODO
    NAV: generalProcessor, // TODO
    // OL: generalProcessor, // TODO
    P: generalProcessor,
    PRE: generalProcessor,
    S: generalProcessor,
    SECTION: generalProcessor,
    SPAN: generalProcessor,
    STRIKE: generalProcessor,
    STRONG: generalProcessor,
    SUB: generalProcessor,
    SUP: generalProcessor,
    TABLE: tableProcessor,
    TD: generalProcessor, // TODO
    TBODY: generalProcessor, // TODO
    TFOOT: generalProcessor, // TODO
    TH: generalProcessor, // TODO
    U: generalProcessor,
    // UL: generalProcessor, // TODO
    VIDEO: generalProcessor, // TODO
};

/**
 * @internal
 */
export function getProcessor(tagName: string): ElementProcessor {
    return ProcessorMap[tagName];
}
