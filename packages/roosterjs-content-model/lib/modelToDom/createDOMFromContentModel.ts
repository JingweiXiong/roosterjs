import { ContentModelDocument } from '../publicTypes/block/group/ContentModelDocument';
import { createRange } from 'roosterjs-editor-dom';
import { getSelectionPosition } from './utils/getSelectionPosition';
import { handleBlock } from './handlers/handleBlock';
import { handleBlock } from './handlers/handleBlock';
import { isNodeOfType } from '../domUtils/isNodeOfType';
import { NodeType, SelectionRangeEx, SelectionRangeTypes } from 'roosterjs-editor-types';
import { optimize } from './optimizers/optimize';
import { optimize } from './optimizers/optimize';
import { SelectionInfo } from './types/SelectionInfo';
import { SelectionRangeEx } from 'roosterjs-editor-types';

/**
 * Create DOM tree from Content Model
 * @param model The root of Content Model
 * @param optimizeLevel Optimization level, @default 2
 * @returns A DocumentFragment of DOM tree from the Content Model and the selection from this model
 */
export default function createDOMFromContentModel(
    model: ContentModelDocument,
    optimizeLevel: number = 2
): [DocumentFragment, SelectionRangeEx | undefined] {
    const fragment = model.document.createDocumentFragment();
    const info: SelectionInfo = {
        context: {
            currentBlockNode: null,
            currentSegmentNode: null,
        },
    };

    handleBlock(model.document, fragment, model, info);

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
