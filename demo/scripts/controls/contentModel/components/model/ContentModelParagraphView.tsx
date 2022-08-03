import * as React from 'react';
import { BackgroundColorFormatRenderer } from '../format/formatPart/BackgroundColorFormatRenderer';
import { ContentModel } from '../ContentModel';
import { ContentModelSegmentView } from './ContentModelSegmentView';
import { DirectionFormatRenderer } from '../format/formatPart/DirectionFormat';
import { FormatRenderer } from '../format/utils/FormatRenderer';
import { FormatView } from '../format/FormatView';
import { IndentationFormatRenderer } from '../format/formatPart/IndentationFormatRenderer';
import { LineHeightFormatRenderer } from '../format/formatPart/LineHeightFormatRenderer';
import { MarginFormatRenderers } from '../format/formatPart/MarginFormatRenderers';
import { TextAlignFormatRenderer } from '../format/formatPart/TextAlignFormatRenderer';
import { WhiteSpaceFormatRenderer } from '../format/formatPart/WhiteSpaceFormatRenderer';
import {
    ContentModelParagraph,
    ContentModelParagraphFormat,
    hasSelectionInBlock,
} from 'roosterjs-content-model';

const styles = require('./ContentModelParagraphView.scss');

const ParagraphFormatRenders: FormatRenderer<ContentModelParagraphFormat>[] = [
    BackgroundColorFormatRenderer,
    DirectionFormatRenderer,
    TextAlignFormatRenderer,
    ...MarginFormatRenderers,
    IndentationFormatRenderer,
    LineHeightFormatRenderer,
    WhiteSpaceFormatRenderer,
];

export function ContentModelParagraphView(props: { paragraph: ContentModelParagraph }) {
    const { paragraph } = props;
    const getContent = React.useCallback(() => {
        return (
            <>
                {paragraph.segments.map(segment => (
                    <ContentModelSegmentView segment={segment} />
                ))}
            </>
        );
    }, [paragraph]);

    const getFormat = React.useCallback(() => {
        return <FormatView format={paragraph.format} renderers={ParagraphFormatRenders} />;
    }, [paragraph.format]);

    return (
        <ContentModel
            title="Paragraph"
            subTitle={paragraph.isImplicit ? ' (Implicit)' : ''}
            isExpanded={true}
            className={styles.modelParagraph}
            hasSelection={hasSelectionInBlock(paragraph)}
            isSelected={false}
            jsonSource={paragraph}
            getContent={getContent}
            getFormat={getFormat}
        />
    );
}
