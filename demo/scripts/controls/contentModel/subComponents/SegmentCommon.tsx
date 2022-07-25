import * as React from 'react';
import { ContentModelSegment } from 'roosterjs-content-model';

export default function SegmentCommon(props: { segment: ContentModelSegment }) {
    const { segment } = props;

    return (
        <>
            <div>
                <input type="checkbox" checked={segment.isSelected} />
                Selected
            </div>
            <div>Format: </div>
        </>
    );
}
