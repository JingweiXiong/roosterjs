import wrap from '../../domUtils/wrap';
import { FormatHandler } from '../FormatHandler';
import { UnderlineFormat } from '../../publicTypes/format/formatParts/UnderlineFormat';

/**
 * @internal
 */
export const underlineFormatHandler: FormatHandler<UnderlineFormat> = {
    parse: (format, element, context, defaultStyle) => {
        const textDecoration = element.style.textDecoration || defaultStyle.textDecoration;

        if (textDecoration?.indexOf('underline')! >= 0) {
            format.underline = true;
        }
    },
    apply: (format, element) => {
        if (format.underline) {
            wrap(element, 'U');
        }
    },
};
