import { FormatHandler } from '../FormatHandler';
import { IndentationFormat } from '../../publicTypes/format/formatParts/IndentationFormat';

/**
 * @internal
 */
export const indentFormatHandler: FormatHandler<IndentationFormat> = {
    parse: (format, element, context, defaultStyle) => {
        const indentation = element.style.textIndent || defaultStyle.textIndent;

        if (indentation) {
            format.indentation = indentation;
        }
    },
    apply: (format, element) => {
        if (format.indentation) {
            element.style.textIndent = format.indentation;
        }
    },
};
