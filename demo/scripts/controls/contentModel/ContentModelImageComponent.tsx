import * as React from 'react';
import getSegmentClassName from './utils/getSegmentClassName';
import SegmentCommon from './subComponents/SegmentCommon';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelImage } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelIMageComponent(props: { image: ContentModelImage }) {
    const { image } = props;
    const { isExpanded, button } = useExpandButton(false);

    return (
        <div className={getSegmentClassName(image)}>
            {useTitle('Segment/Image')}
            {button}
            <input type="text" value={image.src} />
            {isExpanded ? (
                <div className={styles.child}>
                    <SegmentCommon segment={image} />
                    <img src={image.src} />
                </div>
            ) : null}
        </div>
    );
}
