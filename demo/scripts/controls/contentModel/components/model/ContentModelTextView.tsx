import * as React from 'react';
import { ContentModel } from '../ContentModel';
import { ContentModelText } from 'roosterjs-content-model';
import { SegmentFormatView } from '../format/SegmentFormatView';

const styles = require('./ContentModelTextView.scss');

export function ContentModelTextView(props: { text: ContentModelText }) {
    const { text } = props;
    const getContent = React.useCallback(() => {
        return (
            <>
                Text: <br />
                <textarea>{text.text}</textarea>
            </>
        );
    }, [text]);

    const getFormat = React.useCallback(() => {
        return <SegmentFormatView format={text.format} />;
    }, [text.format]);

    return (
        <ContentModel
            title="Text"
            subTitle={text.text}
            isExpanded={false}
            className={styles.modelText}
            hasSelection={false}
            isSelected={text.isSelected}
            jsonSource={text}
            getContent={getContent}
            getFormat={getFormat}
        />
    );
}
