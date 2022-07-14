import { addSegment } from '../utils/addSegment';
import { areSameFormats } from '../utils/areSameFormats';
import { ContentModelBlockGroup } from '../../publicTypes/block/group/ContentModelBlockGroup';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { createText } from '../creators/createText';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export function textProcessor(group: ContentModelBlockGroup, text: string, context: FormatContext) {
    if (text) {
        const paragraph = group.blocks[group.blocks.length - 1];
        const lastSegment =
            paragraph?.blockType == ContentModelBlockType.Paragraph &&
            paragraph.segments[paragraph.segments.length - 1];

        if (
            lastSegment &&
            lastSegment.segmentType == ContentModelSegmentType.Text &&
            lastSegment.isSelected == context.isInSelection &&
            areSameFormats(lastSegment.format, context.segmentFormat)
        ) {
            lastSegment.text += text;
        } else {
            const originalSegmentFormat = context.segmentFormat;

            context.segmentFormat = { ...originalSegmentFormat };
            addSegment(group, context, createText(context, text));
            context.segmentFormat = originalSegmentFormat;
        }
    }
}
