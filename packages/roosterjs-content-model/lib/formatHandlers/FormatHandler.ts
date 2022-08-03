import { ContentModelContext } from '../publicTypes/ContentModelContext';

/**
 * @internal
 */
export interface FormatHandler<TFormat> {
    parse: (
        format: TFormat,
        element: HTMLElement,
        context: ContentModelContext,
        defaultStyle: Partial<CSSStyleDeclaration>
    ) => void;
    apply: (format: TFormat, element: HTMLElement, context: ContentModelContext) => void;
}
