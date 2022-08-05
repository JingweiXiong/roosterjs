import * as React from 'react';
import { ContentModelImage } from 'roosterjs-content-model';
import { ContentModelView } from '../ContentModelView';
import { SegmentFormatView } from '../format/SegmentFormatView';

const styles = require('./ContentModelImageView.scss');

export function ContentModelImageView(props: { image: ContentModelImage }) {
    const { image } = props;
    const getContent = React.useCallback(() => {
        return (
            <div>
                <input type="text" value={image.src} />
                <br />
                <img src={image.src} className={styles.image} />
            </div>
        );
    }, [image]);
    const getFormat = React.useCallback(() => {
        return <SegmentFormatView format={image.format} />;
    }, [image.format]);

    return (
        <ContentModelView
            title="Image"
            subTitle={image.src}
            className={styles.modelImage}
            isSelected={image.isSelected}
            jsonSource={image}
            getContent={getContent}
            getFormat={getFormat}
        />
    );
}
