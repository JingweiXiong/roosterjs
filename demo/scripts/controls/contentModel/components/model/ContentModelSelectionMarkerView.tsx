import * as React from 'react';
import { ContentModel } from '../ContentModel';
import { ContentModelSelectionMarker } from 'roosterjs-content-model';
import { SegmentFormatView } from '../format/SegmentFormatView';

const styles = require('./ContentModelSelectionMarkerView.scss');

export function ContentModelSelectionMarkerView(props: { marker: ContentModelSelectionMarker }) {
    const { marker } = props;

    const getFormat = React.useCallback(() => {
        return <SegmentFormatView format={marker.format} />;
    }, [marker.format]);

    return (
        <ContentModel
            title="SelectionMarker"
            subTitle=""
            isExpanded={false}
            className={styles.modelSelectionMarker}
            hasSelection={false}
            isSelected={true}
            jsonSource={marker}
            getContent={null}
            getFormat={getFormat}
        />
    );
}
