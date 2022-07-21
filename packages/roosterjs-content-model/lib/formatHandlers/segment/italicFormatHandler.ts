import wrap from '../../domUtils/wrap';
import { FormatHandler } from '../FormatHandler';
import { ItalicFormat } from '../../publicTypes/format/formatParts/ItalicFormat';

/**
 * @internal
 */
export const italicFormatHandler: FormatHandler<ItalicFormat> = {
    parse: (format, element, context, defaultStyle) => {
        const fontStyle = element.style.fontStyle || defaultStyle.fontStyle;

        if (fontStyle == 'italic' || fontStyle == 'oblique') {
            format.italic = true;
        } else if (fontStyle == 'initial' || fontStyle == 'normal') {
            format.italic = false;
        }
    },
    apply: (format, element) => {
        if (format.italic) {
            wrap(element, 'I');
        }
    },
};
