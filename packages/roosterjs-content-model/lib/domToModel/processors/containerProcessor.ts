import { addSegment } from '../utils/addSegment';
import { BlockDisplay } from '../defaultStyles/BlockDisplay';
import { ContentModelBlockGroup } from '../../publicTypes/block/group/ContentModelBlockGroup';
import { createSelectionMarker } from '../creators/createSelectionMarker';
import { DefaultStyleMap } from '../defaultStyles/DefaultStyleMap';
import { FormatContext } from '../types/FormatContext';
import { generalBlockProcessor } from './generalBlockProcessor';
import { generalSegmentProcessor } from './generalSegmentProcessor';
import { getProcessor } from './getProcessor';
import { isNodeOfType } from '../../domUtils/isNodeOfType';
import { NodeType } from 'roosterjs-editor-types';
import { textProcessor } from './textProcessor';

/**
 * @internal
 */
export function containerProcessor(
    group: ContentModelBlockGroup,
    parent: Node,
    context: FormatContext
) {
    let nodeStartOffset = context.startContainer == parent ? context.startOffset : -1;
    let nodeEndOffset = context.endContainer == parent ? context.endOffset : -1;
    let index = 0;

    for (let child = parent.firstChild; child; child = child.nextSibling) {
        if (index == nodeStartOffset) {
            context.isInSelection = true;

            addSegment(group, context, createSelectionMarker(context));
        }

        if (index == nodeEndOffset) {
            if (!context.isSelectionCollapsed) {
                addSegment(group, context, createSelectionMarker(context));
            }
            context.isInSelection = false;
        }

        if (isNodeOfType(child, NodeType.Element)) {
            const style = DefaultStyleMap[child.tagName];
            const format = style ? (typeof style === 'function' ? style(child) : style) : {};
            const processor =
                getProcessor(child.tagName) ||
                (BlockDisplay.indexOf(child.style.display || format.display || '') >= 0
                    ? generalBlockProcessor
                    : generalSegmentProcessor);

            processor(group, context, child, format || {});
        } else if (isNodeOfType(child, NodeType.Text)) {
            const textNode = child as Text;

            let txt = textNode.nodeValue || '';
            let txtStartOffset = context.startContainer == textNode ? context.startOffset! : -1;
            let txtEndOffset = context.endContainer == textNode ? context.endOffset! : -1;

            if (txtStartOffset >= 0) {
                textProcessor(group, txt.substring(0, txtStartOffset), context);
                context.isInSelection = true;

                addSegment(group, context, createSelectionMarker(context));

                txt = txt.substring(txtStartOffset);
                txtEndOffset -= txtStartOffset;
            }

            if (txtEndOffset >= 0) {
                textProcessor(group, txt.substring(0, txtEndOffset), context);

                if (!context.isSelectionCollapsed) {
                    addSegment(group, context, createSelectionMarker(context));
                }

                context.isInSelection = false;
                txt = txt.substring(txtEndOffset);
            }

            textProcessor(group, txt, context);
        }

        index++;
    }
}
