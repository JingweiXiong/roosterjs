import { FormatContext } from './FormatContext';

/**
 * @internal
 */
export interface FormatHandler<TFormat> {
    parse: (
        format: TFormat,
        element: HTMLElement,
        context: FormatContext,
        defaultStyle: Partial<CSSStyleDeclaration>
    ) => void;
    apply: (format: TFormat, element: HTMLElement, context: FormatContext) => void;
}
