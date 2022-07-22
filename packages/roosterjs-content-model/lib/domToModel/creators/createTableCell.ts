import { ContentModelTableCell } from '../../publicTypes/block/group/ContentModelTableCell';

/**
 * @internal
 */
export function createTableCell(
    colSpan: number,
    rowSpan: number,
    isHeader: boolean
): ContentModelTableCell {
    return {
        blockType: 'BlockGroup',
        blockGroupType: 'TableCell',
        blocks: [],
        format: {},
        spanLeft: colSpan > 1,
        spanAbove: rowSpan > 1,
        isHeader,
    };
}
