import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { ContentModelParagraphFormat } from '../../publicTypes/format/ContentModelParagraphFormat';

/**
 * @internal
 */
export function createParagraph(
    isImplicit: boolean,
    format?: ContentModelParagraphFormat
): ContentModelParagraph {
    const result: ContentModelParagraph = {
        blockType: ContentModelBlockType.Paragraph,
        segments: [],
        format: format || {},
    };

    if (isImplicit) {
        result.isImplicit = true;
    }

    return result;
}
