import { ContentModelSegmentFormat } from '../../publicTypes/format/ContentModelSegmentFormat';
import { ContentModelSegmentType } from '../../publicTypes/enum/SegmentType';
import { ContentModelText } from '../../publicTypes/segment/ContentModelText';

/**
 * @internal
 */
export function createText(text: string, format?: ContentModelSegmentFormat): ContentModelText {
    return {
        segmentType: ContentModelSegmentType.Text,
        text: text,
        format: format || {},
    };
}
