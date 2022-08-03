import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelParagraph } from '../../publicTypes/block/ContentModelParagraph';
import { DomToModelContext } from '../../domToModel/context/DomToModelContext';

/**
 * @internal
 */
export function createParagraph(
    isImplicit: boolean,
    context: DomToModelContext
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
