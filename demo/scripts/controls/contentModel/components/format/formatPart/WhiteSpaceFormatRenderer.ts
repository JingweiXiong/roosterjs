import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';
import { WhiteSpaceFormat } from 'roosterjs-content-model';

export const WhiteSpaceFormatRenderer: FormatRenderer<WhiteSpaceFormat> = createTextFormatRenderer<
    WhiteSpaceFormat
>(
    'White space',
    format => format.whiteSpace,
    (format, value) => (format.whiteSpace = value)
);
