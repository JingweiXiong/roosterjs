import { BackgroundColorFormat } from './formatParts/BackgroundColorFormat';
import { DirectionFormat } from './formatParts/DirectionFormat';
import { IndentationFormat } from './formatParts/IndentationFormat';
import { LineHeightFormat } from './formatParts/LineHeightFormat';
import { MarginFormat } from './formatParts/MarginFormat';
import { TextAlignFormat } from './formatParts/TextAlignFormat';
import { WhiteSpaceFormat } from './formatParts/WhiteSpaceFormat';

/**
 * The format object for a paragraph in Content Model
 */
export interface ContentModelParagraphFormat
    extends BackgroundColorFormat,
        DirectionFormat,
        TextAlignFormat,
        MarginFormat,
        IndentationFormat,
        LineHeightFormat,
        WhiteSpaceFormat {}
