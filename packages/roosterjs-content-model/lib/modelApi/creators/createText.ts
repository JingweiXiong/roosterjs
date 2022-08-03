import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { ContentModelText } from '../../publicTypes/segment/ContentModelText';
import { DomToModelContext } from '../../domToModel/context/DomToModelContext';

/**
 * @internal
 */
export function createText(text: string, context: DomToModelContext): ContentModelText {
    return {
        segmentType: ContentModelSegmentType.Text,
        text: text,
        format: context.segmentFormat,
    };
}
