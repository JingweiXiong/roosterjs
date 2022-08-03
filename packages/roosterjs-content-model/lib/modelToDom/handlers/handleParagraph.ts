import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { handleSegment } from './handleSegment';
import { ModelToDomContext } from '../context/ModelToDomContext';
import { ParagraphFormatHandlers } from '../../formatHandlers/ParagraphFormatHandlers';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function handleParagraph(
    doc: Document,
    parent: Node,
    paragraph: ContentModelParagraph,
    context: ModelToDomContext,
    info: SelectionInfo
) {
    let container: HTMLElement;

    if (paragraph.isImplicit) {
        container = parent as HTMLElement;
    } else {
        container = doc.createElement('div');
        parent.appendChild(container);
        ParagraphFormatHandlers.forEach(handler =>
            handler.apply(paragraph.format, container, context.contentModelContext)
        );
    }

    info.context.currentBlockNode = container;
    info.context.currentSegmentNode = null;

    paragraph.segments.forEach(segment => {
        handleSegment(doc, container, segment, context, info);
    });
}
