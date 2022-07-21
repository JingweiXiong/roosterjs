import { address } from './address';
import { b } from './b';
import { block } from './block';
import { blockquote } from './blockquote';
import { center } from './center';
import { dd } from './dd';
import { DefaultFormatParserType } from './DefaultFormatParserType';
import { dl } from './dl';
import { font } from './font';
import { i } from './i';
import { inline } from './inline';
import { li } from './li';
import { p } from './p';
import { pre } from './pre';
import { strike } from './strike';
import { sub } from './sub';
import { sup } from './sup';
import { u } from './u';

const DefaultStyleMap: Record<string, DefaultFormatParserType> = {
    A: inline,
    ADDRESS: address,
    ARTICLE: block,
    ASIDE: block,
    B: b,
    BODY: block,
    BLOCKQUOTE: blockquote,
    BR: block,
    CENTER: center,
    CODE: inline,
    DIV: block,
    DD: dd,
    DL: dl,
    DT: block,
    EM: i,
    FONT: font,
    FIELDSET: block,
    FIGURE: block,
    FIGCAPTION: block,
    FOOTER: block,
    FORM: block,
    I: i,
    IMG: inline,
    H1: block,
    H2: block,
    H3: block,
    H4: block,
    H5: block,
    H6: block,
    HEADER: block,
    HR: block,
    LI: li,
    MAIN: block,
    NAV: block,
    OL: block,
    P: p,
    PRE: pre,
    S: strike,
    SECTION: block,
    SPAN: inline,
    STRIKE: strike,
    STRONG: b,
    SUB: sub,
    SUP: sup,
    TABLE: block,
    TD: block,
    TBODY: block,
    TFOOT: block,
    TH: block,
    U: u,
    UL: block,
    VIDEO: block,
};

/**
 * @internal
 */
export function getDefaultStyle(element: HTMLElement): Partial<CSSStyleDeclaration> {
    const style = DefaultStyleMap[element.tagName];
    return style ? (typeof style === 'function' ? style(element) : style) : {};
}
