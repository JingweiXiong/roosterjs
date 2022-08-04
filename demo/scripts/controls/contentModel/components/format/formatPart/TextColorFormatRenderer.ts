import * as Color from 'color';
import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';
import { TextColorFormat } from 'roosterjs-content-model';

export const TextColorFormatRenderer: FormatRenderer<TextColorFormat> = createTextFormatRenderer<
    TextColorFormat
>(
    'Text color',
    format => (format.textColor ? Color(format.textColor).hex() : ''),
    (format, value) => {
        format.textColor = value;
        return undefined;
    },
    'color'
);
