import { ContentModelBlock } from '../../publicTypes/block/ContentModelBlock';
import { ContentModelBlockGroupType } from '../../publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { handleParagraph } from './handleParagraph';
import { handleTable } from './handleTable';
import { ModelToDomContext } from '../context/ModelToDomContext';
import { SelectionInfo } from '../types/SelectionInfo';

/**
 * @internal
 */
export function handleBlock(
    doc: Document,
    parent: Node,
    block: ContentModelBlock,
    context: ModelToDomContext,
    info: SelectionInfo
) {
    switch (block.blockType) {
        case ContentModelBlockType.List:
            break;

        case ContentModelBlockType.Table:
            handleTable(doc, parent, block, context, info);
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

            block.blocks.forEach(childBlock =>
                handleBlock(doc, newParent, childBlock, context, info)
            );

            break;
        case ContentModelBlockType.Paragraph:
            handleParagraph(doc, parent, block, context, info);
            break;
    }
}
