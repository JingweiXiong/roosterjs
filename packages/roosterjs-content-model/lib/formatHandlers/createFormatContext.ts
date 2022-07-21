import { FormatContext } from './FormatContext';

/**
 * @internal
 */
export function createFormatContext(
    isDarkMode: boolean = false,
    zoomScale: number = 1,
    isRightToLeft: boolean = false,
    getDarkColor?: (lightColor: string) => string,
    range?: Range
): FormatContext {
    const context: FormatContext = {
        isDarkMode,
        zoomScale,
        isRightToLeft,
        getDarkColor,

        blockFormat: {},
        segmentFormat: {},
        isInSelection: false,
    };

    if (range) {
        context.startContainer = range.startContainer;
        context.startOffset = range.startOffset;
        context.endContainer = range.endContainer;
        context.endOffset = range.endOffset;
        context.isSelectionCollapsed = range.collapsed;
    }

    return context;
}
