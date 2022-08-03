import * as React from 'react';
import { ContentModel } from '../ContentModel';
import { ContentModelBlockView } from './ContentModelBlockView';
import { ContentModelTableCell, hasSelectionInBlock } from 'roosterjs-content-model';
import { TableCellFormatView } from '../format/TableCellFormatView';

const styles = require('./ContentModelTableCellView.scss');

export function ContentModelTableCellView(props: { cell: ContentModelTableCell }) {
    const { cell } = props;
    const getContent = React.useCallback(() => {
        return (
            <>
                <div>
                    <input type="checkbox" checked={cell.isHeader} />
                    Header
                </div>
                <div>
                    <input type="checkbox" checked={cell.spanLeft} />
                    Span Left
                </div>
                <div>
                    <input type="checkbox" checked={cell.spanAbove} />
                    Span Above
                </div>
                {cell.blocks.map(block => (
                    <ContentModelBlockView block={block} />
                ))}
            </>
        );
    }, [cell]);

    const getFormat = React.useCallback(() => {
        return <TableCellFormatView format={cell.format} />;
    }, [cell.format]);

    return (
        <ContentModel
            title="TableCell"
            subTitle={
                cell.spanAbove && cell.spanLeft
                    ? '↖'
                    : cell.spanLeft
                    ? '←'
                    : cell.spanAbove
                    ? '↑'
                    : cell.isHeader
                    ? 'TH'
                    : 'TD'
            }
            isExpanded={false}
            className={styles.modelTableCell}
            hasSelection={hasSelectionInBlock(cell)}
            isSelected={cell.isSelected}
            jsonSource={cell}
            getContent={getContent}
            getFormat={getFormat}
        />
    );
}
