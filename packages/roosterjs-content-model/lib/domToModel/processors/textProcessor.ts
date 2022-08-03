import { addSegment } from '../../modelApi/common/addSegment';
import { areSameFormats } from '../utils/areSameFormats';
import { ContentModelBlockGroup } from '../../publicTypes/block/group/ContentModelBlockGroup';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { createText } from '../../modelApi/creators/createText';
import { DomToModelContext } from '../context/DomToModelContext';

/**
 * @internal
 */
export function textProcessor(
    group: ContentModelBlockGroup,
    text: string,
    context: DomToModelContext
) {
    if (text) {
        const paragraph = group.blocks[group.blocks.length - 1];
        const lastSegment =
            paragraph?.blockType == ContentModelBlockType.Paragraph &&
            paragraph.segments[paragraph.segments.length - 1];

        if (
            lastSegment &&
            lastSegment.segmentType == ContentModelSegmentType.Text &&
            !!lastSegment.isSelected == !!context.isInSelection &&
            areSameFormats(lastSegment.format, context.segmentFormat)
        ) {
            lastSegment.text += text;
        } else {
            const originalSegmentFormat = context.segmentFormat;
            const textModel = createText(text, context);

            context.segmentFormat = { ...originalSegmentFormat };

            if (context.isInSelection) {
                textModel.isSelected = true;
            }

            addSegment(group, textModel, context);
            context.segmentFormat = originalSegmentFormat;
        }
    }
}
