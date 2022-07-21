import { BackgroundColorFormat } from './formatParts/BackgroundColorFormat';
import { BoldFormat } from './formatParts/BoldFormat';
import { FontFamilyFormat } from './formatParts/FontFamilyFormat';
import { FontSizeFormat } from './formatParts/FontSizeFormat';
import { HyperLinkFormat } from './formatParts/HyperLinkFormat';
import { ItalicFormat } from './formatParts/ItalicFormat';
import { StrikeFormat } from './formatParts/StrikeFormat';
import { SuperOrSubScriptFormat } from './formatParts/SuperOrSubScriptFormat';
import { TextColorFormat } from './formatParts/TextColorFormat';
import { UnderlineFormat } from './formatParts/UnderlineFormat';

/**
 * The format object for a segment in Content Model
 */
export interface ContentModelSegmentFormat
    extends TextColorFormat,
        BackgroundColorFormat,
        FontSizeFormat,
        FontFamilyFormat,
        BoldFormat,
        ItalicFormat,
        UnderlineFormat,
        StrikeFormat,
        SuperOrSubScriptFormat,
        HyperLinkFormat {}
