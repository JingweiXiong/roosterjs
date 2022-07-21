import { backgroundColorFormatHandler } from './common/backgroundColorFormatHandler';
import { ContentModelParagraphFormat } from '../publicTypes/format/ContentModelParagraphFormat';
import { directionFormatHandler } from './paragraph/directionFormatHandler';
import { FormatHandler } from './FormatHandler';
import { indentFormatHandler } from './paragraph/indentFormatHandler';
import { lineHeightFormatHandler } from './paragraph/lineHeightFormatHandler';
import { marginFormatHandler } from './paragraph/marginFormatHandler';
import { textAlignFormatHandler } from './common/textAlignFormatHandler';
import { whiteSpaceFormatHandler } from './paragraph/whiteSpaceFormatHandler';

/**
 * @internal
 */
export const ParagraphFormatHandlers: FormatHandler<ContentModelParagraphFormat>[] = [
    backgroundColorFormatHandler,
    directionFormatHandler,
    textAlignFormatHandler,
    marginFormatHandler,
    indentFormatHandler,
    lineHeightFormatHandler,
    whiteSpaceFormatHandler,
];
