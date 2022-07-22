import { ContentModelBlockBase } from './ContentModelBlockBase';
import { ContentModelTableCell } from './group/ContentModelTableCell';
import { ContentModelTableFormat } from '../format/ContentModelTableFormat';

/**
 * Content Model of Table
 */
export interface ContentModelTable extends ContentModelBlockBase<'Table'> {
    /**
     * Format of this table
     */
    format: ContentModelTableFormat;

    /**
     * Cells of this table
     */
    cells: ContentModelTableCell[][];
}
