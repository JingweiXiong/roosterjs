import * as React from 'react';
import getSegmentClassName from './utils/getSegmentClassName';
import SegmentCommon from './subComponents/SegmentCommon';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelText } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelTextComponent(props: { text: ContentModelText }) {
    const { text } = props;
    const { isExpanded, button } = useExpandButton(true);

    return (
        <div className={getSegmentClassName(text)}>
            {useTitle('Segment/Text')}
            {button}
            <input type="text" value={text.text} />
            {isExpanded ? (
                <div className={styles.child}>
                    <SegmentCommon segment={text} />
                </div>
            ) : null}
        </div>
    );
}
