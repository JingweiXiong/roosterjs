import { ContentModelSegment } from '../../publicTypes/segment/ContentModelSegment';
import { FormatContext } from '../../formatHandlers/FormatContext';
import { handleBlock } from './handleBlock';

/**
 * @internal
 */
export function handleSegment(
    doc: Document,
    parent: Node,
    segment: ContentModelSegment,
    context: FormatContext
) {
    let element: HTMLElement | null = null;

    switch (segment.segmentType) {
        case 'Text':
            const txt = doc.createTextNode(segment.text);

            element = doc.createElement('span');
            element.appendChild(txt);
            break;

        case 'General':
            handleBlock(doc, parent, segment, context);
            break;
    }

    if (element) {
        parent.appendChild(element);
    }
}
