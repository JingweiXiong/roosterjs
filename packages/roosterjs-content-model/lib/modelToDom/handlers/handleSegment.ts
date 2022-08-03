import { ContentModelSegment } from '../../publicTypes/segment/ContentModelSegment';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { getSelectionPosition } from '../utils/getSelectionPosition';
import { handleBlock } from './handleBlock';
import { ModelToDomContext } from '../context/ModelToDomContext';
import { SegmentFormatHandlers } from '../../formatHandlers/SegmentFormatHandlers';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function handleSegment(
    doc: Document,
    parent: Node,
    segment: ContentModelSegment,
    context: ModelToDomContext,
    info: SelectionInfo
) {
    if (!info.start && segment.isSelected) {
        info.start = getSelectionPosition(info.context);
    }

    if (info.start && !info.end && !segment.isSelected) {
        info.end = getSelectionPosition(info.context);
    }

    let element: HTMLElement | null = null;

    switch (segment.segmentType) {
        case ContentModelSegmentType.Image:
            element = doc.createElement('img');
            element.setAttribute('src', segment.src);
            info.context.currentSegmentNode = element;
            break;
        case ContentModelSegmentType.Text:
            const txt = doc.createTextNode(segment.text);

            if (segment.format.linkHref) {
                element = doc.createElement('a');
                element.setAttribute('href', segment.format.linkHref);
                if (segment.format.linkTarget) {
                    element.setAttribute('target', segment.format.linkTarget);
                }
            } else {
                element = doc.createElement('span');
            }
            element.appendChild(txt);
            info.context.currentSegmentNode = txt;
            break;

        case ContentModelSegmentType.Br:
            element = doc.createElement('br');
            info.context.currentSegmentNode = element;
            break;

        case ContentModelSegmentType.General:
            info.context.currentSegmentNode = segment.element;

            handleBlock(doc, parent, segment, context, info);
            break;
    }

    if (element) {
        parent.appendChild(element);

        SegmentFormatHandlers.forEach(handler => {
            handler.apply(segment.format, element!, context.contentModelContext);
        });
    }
}
