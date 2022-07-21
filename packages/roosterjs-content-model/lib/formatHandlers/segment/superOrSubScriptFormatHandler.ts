import wrap from '../../domUtils/wrap';
import { FormatHandler } from '../FormatHandler';
import { SuperOrSubScriptFormat } from '../../publicTypes/format/formatParts/SuperOrSubScriptFormat';

/**
 * @internal
 */
export const superOrSubScriptFormatHandler: FormatHandler<SuperOrSubScriptFormat> = {
    parse: (format, element, context, defaultStyle) => {
        const verticalAlign = element.style.verticalAlign || defaultStyle.verticalAlign;

        if (verticalAlign == 'sub') {
            format.subscript = true;
            format.superscript = false;
        } else if (verticalAlign == 'super') {
            format.superscript = true;
            format.subscript = false;
        }
    },
    apply: (format, element) => {
        if (format.superscript) {
            wrap(element, 'SUP');
        }

        if (format.subscript) {
            wrap(element, 'SUB');
        }
    },
};
