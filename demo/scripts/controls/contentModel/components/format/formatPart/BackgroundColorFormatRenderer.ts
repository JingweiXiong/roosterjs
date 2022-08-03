import * as Color from 'color';
import { BackgroundColorFormat } from 'roosterjs-content-model';
import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';

export const BackgroundColorFormatRenderer: FormatRenderer<BackgroundColorFormat> = createTextFormatRenderer<
    BackgroundColorFormat
>(
    'Back color',
    format => (format.backgroundColor ? Color(format.backgroundColor).hex() : '#FFFFFF'),
    (format, value) => (format.backgroundColor = value),
    'color'
);
