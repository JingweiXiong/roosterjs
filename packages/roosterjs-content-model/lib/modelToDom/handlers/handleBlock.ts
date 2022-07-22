import { ContentModelBlock } from '../../publicTypes/block/ContentModelBlock';
import { ContentModelBlockGroupType } from '../../publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { FormatContext } from '../../formatHandlers/FormatContext';
import { handleParagraph } from './handleParagraph';
import { handleTable } from './handleTable';

/**
 * @internal
 */
export function handleBlock(
    doc: Document,
    parent: Node,
    block: ContentModelBlock,
    context: FormatContext
) {
    switch (block.blockType) {
        case ContentModelBlockType.Table:
            handleTable(doc, parent, block, context);
            break;

        case ContentModelBlockType.BlockGroup:
            let newParent = parent;

            switch (block.blockGroupType) {
                case ContentModelBlockGroupType.General:
                    newParent = block.element.cloneNode();
                    parent.appendChild(newParent);
                    break;
                default:
                    break;
            }

            block.blocks.forEach(childBlock => handleBlock(doc, newParent, childBlock, context));

            break;
        case ContentModelBlockType.Paragraph:
            handleParagraph(doc, parent, block, context);
            break;
    }
}
