import * as React from 'react';
import getSegmentClassName from './utils/getSegmentClassName';
import SegmentCommon from './subComponents/SegmentCommon';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelBr } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelBrComponent(props: { br: ContentModelBr }) {
    const { br } = props;
    const { isExpanded, button } = useExpandButton(false);

    return (
        <div className={getSegmentClassName(br)}>
            {useTitle('Segment/BR')} {button}
            {isExpanded ? (
                <div className={styles.child}>
                    <SegmentCommon segment={br} />
                </div>
            ) : null}
        </div>
    );
}
