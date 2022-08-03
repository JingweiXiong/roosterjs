import * as React from 'react';
import { BackgroundColorFormatRenderer } from '../format/formatPart/BackgroundColorFormatRenderer';
import { BorderFormatRenderers } from '../format/formatPart/BorderFormatRenderers';
import { ContentModel } from '../ContentModel';
import { ContentModelBlockView } from './ContentModelBlockView';
import { createMetadataFormatRenderer } from '../format/formatPart/MetadataFormatRenderer';
import { FormatRenderer } from '../format/utils/FormatRenderer';
import { FormatView } from '../format/FormatView';
import { SizeFormatRenderers } from '../format/formatPart/SizeFormatRenderers';
import { TextAlignFormatRenderer } from '../format/formatPart/TextAlignFormatRenderer';
import { VerticalAlignFormatRenderer } from '../format/formatPart/VerticalAlignFormatRenderer';
import {
    ContentModelTableCell,
    ContentModelTableCellFormat,
    hasSelectionInBlock,
} from 'roosterjs-content-model';

const styles = require('./ContentModelTableCellView.scss');

const TableCellFormatRenderers: FormatRenderer<ContentModelTableCellFormat>[] = [
    ...SizeFormatRenderers,
    ...BorderFormatRenderers,
    BackgroundColorFormatRenderer,
    TextAlignFormatRenderer,
    VerticalAlignFormatRenderer,
    createMetadataFormatRenderer(null),
];

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
        return <FormatView format={cell.format} renderers={TableCellFormatRenderers} />;
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
