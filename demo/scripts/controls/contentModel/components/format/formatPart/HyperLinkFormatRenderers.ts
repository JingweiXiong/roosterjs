import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { FormatRenderer } from '../utils/FormatRenderer';
import { HyperLinkFormat } from 'roosterjs-content-model';

export const HyperLinkFormatRenderers: FormatRenderer<HyperLinkFormat>[] = [
    createTextFormatRenderer<HyperLinkFormat>(
        'Link href',
        format => format.linkHref,
        (format, value) => {
            format.linkHref = value;
            return undefined;
        }
    ),
    createTextFormatRenderer<HyperLinkFormat>(
        'Link target',
        format => format.linkTarget,
        (format, value) => {
            format.linkTarget = value;
            return undefined;
        }
    ),
];
