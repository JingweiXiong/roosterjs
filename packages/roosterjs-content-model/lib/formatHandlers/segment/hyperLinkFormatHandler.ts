import { FormatHandler } from '../FormatHandler';
import { HyperLinkFormat } from '../../publicTypes/format/formatParts/HyperLinkFormat';

/**
 * @internal
 */
export const hyperLinkFormatHandler: FormatHandler<HyperLinkFormat> = {
    parse: (format, element) => {
        if (element.tagName == 'A') {
            const href = element.getAttribute('href');
            const target = element.getAttribute('target');

            if (href) {
                format.linkHref = href;

                if (target) {
                    format.linkTarget = target;
                }
            }
        }
    },
    apply: (format, element) => {
        // if (format.linkHref) {
        //     const a = wrap(element, 'A') as HTMLAnchorElement;
        //     a.href = format.linkHref;
        //     if (format.linkTarget) {
        //         a.target = format.linkTarget;
        //     }
        // }
    },
};
