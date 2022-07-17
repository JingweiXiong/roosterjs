import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { createSegmentFromContent } from './createSegmentFromContent';
import { ParagraphFormatHandlers } from '../../formatHandlers/ParagraphFormatHandlers';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function createParagraph(
    doc: Document,
    parent: Node,
    paragraph: ContentModelParagraph,
    info: SelectionInfo
) {
    let container: HTMLElement;

    if (paragraph.isImplicit) {
        container = parent as HTMLElement;
    } else {
        container = doc.createElement('div');
        parent.appendChild(container);
        ParagraphFormatHandlers.forEach(handler => handler.writeBack(paragraph.format, container));
    }

    info.context.currentBlockNode = container;
    info.context.currentSegmentNode = null;

    paragraph.segments.forEach(segment => {
        createSegmentFromContent(doc, container, segment, info);
    });
}
