import { FormatHandler } from '../FormatHandler';
import { MarginFormat } from '../../publicTypes/format/formatParts/MarginFormat';

/**
 * @internal
 */
export const marginFormatHandler: FormatHandler<MarginFormat> = {
    parse: (format, element, context, defaultStyle) => {
        const marginTop = element.style.marginTop || defaultStyle.marginTop;
        const marginBottom = element.style.marginBottom || defaultStyle.marginBottom;
        const marginLeft = element.style.marginLeft || defaultStyle.marginLeft;
        const marginRight = element.style.marginRight || defaultStyle.marginRight;

        if (marginTop) {
            format.marginTop = marginTop;
        }
        if (marginBottom) {
            format.marginBottom = marginBottom;
        }
        if (marginLeft) {
            format.marginLeft = marginLeft; // TODO merge with parent margin
        }
        if (marginRight) {
            format.marginRight = marginRight; // TODO merge with parent margin
        }
    },
    apply: (format, element) => {
        if (format.marginTop) {
            element.style.marginTop = format.marginTop;
        }
        if (format.marginBottom) {
            element.style.marginBottom = format.marginBottom;
        }
        if (format.marginLeft) {
            element.style.marginLeft = format.marginLeft;
        }
        if (format.marginRight) {
            element.style.marginRight = format.marginRight;
        }
    },
};
