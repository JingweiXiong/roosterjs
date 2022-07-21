import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { FormatContext } from '../../formatHandlers/FormatContext';
import { handleSegment } from './handleSegment';
import { ParagraphFormatHandlers } from '../../formatHandlers/ParagraphFormatHandlers';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function handleParagraph(
    doc: Document,
    parent: Node,
    paragraph: ContentModelParagraph,
    context: FormatContext,
    info: SelectionInfo
) {
    let container: HTMLElement;

    if (paragraph.isImplicit) {
        container = parent as HTMLElement;
    } else {
        container = doc.createElement('div');
        parent.appendChild(container);
        ParagraphFormatHandlers.forEach(handler =>
            handler.apply(paragraph.format, container, context)
        );
    }

    info.context.currentBlockNode = container;
    info.context.currentSegmentNode = null;

    paragraph.segments.forEach(segment => {
        handleSegment(doc, container, segment, context, info);
    });
}
