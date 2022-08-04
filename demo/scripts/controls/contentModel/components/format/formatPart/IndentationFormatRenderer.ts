import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';
import { IndentationFormat } from 'roosterjs-content-model';

export const IndentationFormatRenderer: FormatRenderer<IndentationFormat> = createTextFormatRenderer<
    IndentationFormat
>(
    'Indentation',
    format => format.indentation,
    (format, value) => {
        format.indentation = value;
        return undefined;
    }
);
