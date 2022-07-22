import { ContentModelBlock } from '../../publicTypes/block/ContentModelBlock';
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
        case 'Table':
            handleTable(doc, parent, block, context);
            break;

        case 'BlockGroup':
            let newParent = parent;

            switch (block.blockGroupType) {
                case 'General':
                    newParent = block.element.cloneNode();
                    parent.appendChild(newParent);
                    break;
                default:
                    break;
            }

            block.blocks.forEach(childBlock => handleBlock(doc, newParent, childBlock, context));

            break;
        case 'Paragraph':
            handleParagraph(doc, parent, block, context);
            break;
    }
}
