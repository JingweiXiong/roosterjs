import { backgroundColorFormatHandler } from './common/backgroundColorFormatHandler';
import { boldFormatHandler } from './segment/boldFormatHandler';
import { ContentModelSegmentFormat } from '../publicTypes/format/ContentModelSegmentFormat';
import { fontFamilyFormatHandler } from './common/fontFamilyFormatHandler';
import { fontSizeFormatHandler } from './common/fontSizeFormatHandler';
import { FormatHandler } from './FormatHandler';
import { hyperLinkFormatHandler } from './segment/hyperLinkFormatHandler';
import { italicFormatHandler } from './segment/italicFormatHandler';
import { strikeFormatHandler } from './segment/strikeFormatHandler';
import { superOrSubScriptFormatHandler } from './segment/superOrSubScriptFormatHandler';
import { textColorFormatHandler } from './common/textColorFormatHandler';
import { underlineFormatHandler } from './segment/underlineFormatHandler';
// Order by frequency, from not common used to common used, for better optimization

/**
 * @internal
 */
export const SegmentFormatHandlers: FormatHandler<ContentModelSegmentFormat>[] = [
    superOrSubScriptFormatHandler,
    strikeFormatHandler,
    fontFamilyFormatHandler,
    fontSizeFormatHandler,
    underlineFormatHandler,
    italicFormatHandler,
    boldFormatHandler,
    textColorFormatHandler,
    backgroundColorFormatHandler,
    hyperLinkFormatHandler,
];
