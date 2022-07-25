import * as React from 'react';
import renderContentModelBlock from './renderContentModelBlock';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelTableCell } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelTableCellComponent(props: { cell: ContentModelTableCell }) {
    const { cell } = props;
    const { isExpanded, button } = useExpandButton(false);

    return (
        <div className={styles.tableCell + ' ' + (cell.isSelected ? styles.selected : '')}>
            {useTitle('Block/BlockGroup/TableCell')}
            {button}

            {isExpanded ? (
                <div className={styles.child}>
                    <div>
                        <input type="checkbox" checked={cell.isHeader} />
                        Header
                    </div>
                    <div>
                        <input type="checkbox" checked={cell.spanLeft} />
                        SpanLeft
                    </div>
                    <div>
                        <input type="checkbox" checked={cell.spanAbove} />
                        SpanAbove
                    </div>
                    {cell.blocks.map(renderContentModelBlock)}
                </div>
            ) : null}
        </div>
    );
}
