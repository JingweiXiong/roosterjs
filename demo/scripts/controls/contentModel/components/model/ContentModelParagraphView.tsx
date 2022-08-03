import * as React from 'react';
import { ContentModel } from '../ContentModel';
import { ContentModelParagraph, hasSelectionInBlock } from 'roosterjs-content-model';
import { ContentModelSegmentView } from './ContentModelSegmentView';
import { ParagraphFormatView } from '../format/ParagraphFormatView';

const styles = require('./ContentModelParagraphView.scss');

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
        return <ParagraphFormatView format={paragraph.format} />;
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
