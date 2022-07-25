import * as React from 'react';
import renderContentModelBlock from './renderContentModelBlock';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelTable } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelTableComponent(props: { table: ContentModelTable }) {
    const { table } = props;
    const { isExpanded, button } = useExpandButton(true);

    return (
        <div className={styles.block}>
            {useTitle('Block/Table')}
            {button}

            {isExpanded ? (
                <div className={styles.child}>
                    {table.cells.map(row => {
                        return <div className={styles.tr}>{row.map(renderContentModelBlock)}</div>;
                    })}
                </div>
            ) : null}
        </div>
    );
}
