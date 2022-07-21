import { ContentModelDocument } from '../publicTypes/block/group/ContentModelDocument';
import { createFormatContext } from '../formatHandlers/createFormatContext';
import { createRange } from 'roosterjs-editor-dom';
import { getSelectionPosition } from './utils/getSelectionPosition';
import { handleBlock } from './handlers/handleBlock';
import { isNodeOfType } from '../domUtils/isNodeOfType';
import { NodeType, SelectionRangeEx, SelectionRangeTypes } from 'roosterjs-editor-types';
import { optimize } from './optimizers/optimize';
import { SelectionInfo } from './types/SelectionInfo';

/**
 * Create DOM tree from Content Model
 * @param model The root of Content Model
 * @param isDarkMode Whether the content is in dark mode @default false
 * @param zoomScale Zoom scale value of the content @default 1
 * @param isRtl Whether the content is from right to left @default false
 * @param getDarkColor A callback function used for calculate dark mode color from light mode color
 * @param optimizeLevel Optimization level, @default 2
 * @returns A DocumentFragment of DOM tree from the Content Model and the selection from this model
 */
export default function createDOMFromContentModel(
    model: ContentModelDocument,
    isDarkMode: boolean,
    zoomScale: number,
    isRtl: boolean,
    getDarkColor: (lightColor: string) => string,
    optimizeLevel: number = 2
): [DocumentFragment, SelectionRangeEx | undefined] {
    const fragment = model.document.createDocumentFragment();
    const context = createFormatContext(isDarkMode, zoomScale, isRtl, getDarkColor);
    const info: SelectionInfo = {
        context: {
            currentBlockNode: null,
            currentSegmentNode: null,
        },
    };

    handleBlock(model.document, fragment, model, context, info);

    if (info.start && !info.end) {
        info.end = getSelectionPosition(info.context);
    }

    if (isNodeOfType(info.start?.node, NodeType.DocumentFragment)) {
        info.start = info.start?.normalize();
    }

    if (isNodeOfType(info.end?.node, NodeType.DocumentFragment)) {
        info.end = info.end?.normalize();
    }

    optimize(fragment, optimizeLevel);

    let selection: SelectionRangeEx | undefined = undefined;

    if (info.start && info.end) {
        const range = createRange(info.start, info.end);
        selection = {
            type: SelectionRangeTypes.Normal,
            ranges: [range],
            areAllCollapsed: range.collapsed,
        };
    }

    return [fragment, selection];
}
