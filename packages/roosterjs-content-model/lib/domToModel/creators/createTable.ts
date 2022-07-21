import { ContentModelBlockType } from '../../publicTypes/enum/BlockType';
import { ContentModelTable } from '../../publicTypes/block/ContentModelTable';
import { ContentModelTableCell } from '../../publicTypes/block/group/ContentModelTableCell';
import { FormatContext } from '../../formatHandlers/FormatContext';

/**
 * @internal
 */
export function createTable(context: FormatContext, rowCount: number): ContentModelTable {
    const rows: ContentModelTableCell[][] = [];

    for (let i = 0; i < rowCount; i++) {
        rows.push([]);
    }

    return {
        blockType: ContentModelBlockType.Table,
        cells: rows,
        format: {},
    };
}
