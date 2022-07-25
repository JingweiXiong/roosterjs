import * as React from 'react';
import getSegmentClassName from './utils/getSegmentClassName';
import SegmentCommon from './subComponents/SegmentCommon';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelSelectionMarker } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelBrComponent(props: { marker: ContentModelSelectionMarker }) {
    const { marker } = props;
    const { isExpanded, button } = useExpandButton(false);

    return (
        <div className={getSegmentClassName(marker)}>
            {useTitle('Segment/SelectionMarker')}
            {button}
            {isExpanded ? (
                <div className={styles.child}>
                    <SegmentCommon segment={marker} />
                </div>
            ) : null}
        </div>
    );
}
