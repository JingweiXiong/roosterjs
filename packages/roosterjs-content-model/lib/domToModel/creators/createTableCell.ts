import { ContentModelBlockGroupType } from '../../publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelTableCell } from '../../publicTypes/block/group/ContentModelTableCell';
import { FormatContext } from '../../formatHandlers/FormatContext';

/**
 * @internal
 */
export function createTableCell(
    context: FormatContext,
    colSpan: number,
    rowSpan: number,
    isHeader: boolean
): ContentModelTableCell {
    const result: ContentModelTableCell = {
        blockType: ContentModelBlockType.BlockGroup,
        blockGroupType: ContentModelBlockGroupType.TableCell,
        blocks: [],
        format: {},
        spanLeft: colSpan > 1,
        spanAbove: rowSpan > 1,
        isHeader,
    };

    if (context.isInSelection) {
        result.isSelected = true;
    }

    return result;
}
