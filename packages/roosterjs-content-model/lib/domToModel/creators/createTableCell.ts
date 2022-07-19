import { ContentModelBlockGroupType } from '../../publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelTableCell } from '../../publicTypes/block/group/ContentModelTableCell';
import { FormatContext } from '../types/FormatContext';

/**
 * @internal
 */
export function createTableCell(
    context: FormatContext,
    colSpan: number,
    rowSpan: number,
    isHeader: boolean
): ContentModelTableCell {
    return {
        blockType: ContentModelBlockType.BlockGroup,
        blockGroupType: ContentModelBlockGroupType.TableCell,
        blocks: [],
        spanLeft: colSpan > 1,
        spanAbove: rowSpan > 1,
        isHeader,
    };
}
