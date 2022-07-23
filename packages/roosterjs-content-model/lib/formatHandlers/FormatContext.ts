import { ContentModelParagraphFormat } from '../publicTypes/format/ContentModelParagraphFormat';
import { ContentModelSegmentFormat } from '../publicTypes/format/ContentModelSegmentFormat';
import { Coordinates } from 'roosterjs-editor-types';

/**
 * Context of format, used for parse format from HTML element according to current context
 */
export interface FormatContext {
    /**
     * Whether current content is in dark mode
     */
    isDarkMode: boolean;

    /**
     * Zoom scale of the content
     */
    zoomScale: number;

    /**
     * Whether current content is from right to left
     */
    isRightToLeft: boolean;

    /**
     * Calculate color for dark mode
     * @param lightColor Light mode color
     * @returns Dark mode color calculated from lightColor
     */
    getDarkColor?: (lightColor: string) => string;

    blockFormat: ContentModelParagraphFormat;
    segmentFormat: ContentModelSegmentFormat;
    isInSelection: boolean;

    regularSelection?: {
        isSelectionCollapsed?: boolean;
        startContainer?: Node;
        endContainer?: Node;
        startOffset?: number;
        endOffset?: number;
    };

    tableSelection?: {
        table: HTMLTableElement;
        firstCell: Coordinates;
        lastCell: Coordinates;
    };

    imageSelection?: {
        image: HTMLImageElement;
    };
}
