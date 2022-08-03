import * as React from 'react';
import { BackgroundColorFormatRenderer } from '../format/formatPart/BackgroundColorFormatRenderer';
import { ContentModel } from '../ContentModel';
import { ContentModelBlockView } from './ContentModelBlockView';
import { createMetadataFormatRenderer } from '../format/formatPart/MetadataFormatRenderer';
import { FormatRenderer } from '../format/utils/FormatRenderer';
import { FormatView } from '../format/FormatView';
import { IdFormatRenderer } from '../format/formatPart/IdFormatRenderer';
import { SizeFormatRenderers } from '../format/formatPart/SizeFormatRenderers';
import { SpacingFormatRenderer } from '../format/formatPart/SpacingFormatRenderer';
import {
    ContentModelTable,
    ContentModelTableFormat,
    hasSelectionInBlock,
} from 'roosterjs-content-model';

const styles = require('./ContentModelTableView.scss');

const TableFormatRenderers: FormatRenderer<ContentModelTableFormat>[] = [
    IdFormatRenderer,
    SpacingFormatRenderer,
    BackgroundColorFormatRenderer,
    createMetadataFormatRenderer(null),
    ...SizeFormatRenderers,
];

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
        return <FormatView format={table.format} renderers={TableFormatRenderers} />;
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
