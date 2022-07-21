import wrap from '../../domUtils/wrap';
import { BoldFormat } from '../../publicTypes/format/formatParts/BoldFormat';
import { FormatHandler } from '../FormatHandler';

/**
 * @internal
 */
export const boldFormatHandler: FormatHandler<BoldFormat> = {
    parse: (format, element, context, defaultStyle) => {
        const fontWeight = element.style.fontWeight || defaultStyle.fontWeight || '';

        if (fontWeight == 'bold' || fontWeight == 'bolder' || parseInt(fontWeight) >= 600) {
            format.bold = true;
        } else if (
            fontWeight == 'normal' ||
            fontWeight == 'lighter' ||
            fontWeight == 'initial' ||
            parseInt(fontWeight) < 600
        ) {
            format.bold = false;
        }
    },
    apply: (format, element) => {
        if (format.bold) {
            wrap(element, 'B');
        }
    },
};
