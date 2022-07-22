import { ContentModelText } from '../../publicTypes/segment/ContentModelText';

/**
 * @internal
 */
export function createText(text: string): ContentModelText {
    const result: ContentModelText = {
        segmentType: 'Text',
        text: text,
    };

    return result;
}
