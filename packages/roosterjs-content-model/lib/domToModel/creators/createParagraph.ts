import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { FormatContext } from '../../formatHandlers/FormatContext';

/**
 * @internal
 */
export function createParagraph(
    isImplicit: boolean,
    context: FormatContext
): ContentModelParagraph {
    const result: ContentModelParagraph = {
        blockType: ContentModelBlockType.Paragraph,
        segments: [],
        format: context.blockFormat,
    };

    if (isImplicit) {
        result.isImplicit = true;
    }

    return result;
}
