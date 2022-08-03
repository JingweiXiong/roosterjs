import * as React from 'react';
import { ContentModel } from '../ContentModel';
import { ContentModelBlockView } from './ContentModelBlockView';
import { ContentModelTable, hasSelectionInBlock } from 'roosterjs-content-model';
import { TableFormatView } from '../format/TableFormatView';

const styles = require('./ContentModelTableView.scss');

export function ContentModelTableView(props: { table: ContentModelTable }) {
    const { table } = props;
    const getContent = React.useCallback(() => {
        return (
            <>
                {table.cells.map(row => (
                    <div className={styles.tableRow}>
                        {row.map(cell => (
                            <ContentModelBlockView block={cell} />
                        ))}
                    </div>
                ))}
            </>
        );
    }, [table]);

    const getFormat = React.useCallback(() => {
        return <TableFormatView format={table.format} />;
    }, [table.format]);

    return (
        <ContentModel
            title="Table"
            subTitle={`${table.cells.length} x ${table.cells[0]?.length || 0}`}
            isExpanded={false}
            className={styles.modelTable}
            hasSelection={hasSelectionInBlock(table)}
            isSelected={false}
            jsonSource={table}
            getContent={getContent}
            getFormat={getFormat}
        />
    );
}
