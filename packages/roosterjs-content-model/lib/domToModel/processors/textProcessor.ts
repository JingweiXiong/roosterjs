import { addSegment } from '../utils/addSegment';
import { ContentModelBlockGroup } from '../../publicTypes/block/group/ContentModelBlockGroup';
import { createText } from '../creators/createText';

/**
 * @internal
 */
export function textProcessor(group: ContentModelBlockGroup, text: string) {
    if (text) {
        const paragraph = group.blocks[group.blocks.length - 1];
        const lastSegment =
            paragraph?.blockType == 'Paragraph' &&
            paragraph.segments[paragraph.segments.length - 1];

        if (lastSegment && lastSegment.segmentType == 'Text') {
            lastSegment.text += text;
        } else {
            addSegment(group, createText(text));
        }
    }
}
