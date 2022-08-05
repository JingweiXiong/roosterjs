import * as React from 'react';
import { ContentModelBrView } from './ContentModelBrView';
import { ContentModelGeneralView } from './ContentModelGeneralView';
import { ContentModelImageView } from './ContentModelImageView';
import { ContentModelSegment, ContentModelSegmentType } from 'roosterjs-content-model';
import { ContentModelSelectionMarkerView } from './ContentModelSelectionMarkerView';
import { ContentModelTextView } from './ContentModelTextView';

export function ContentModelSegmentView(props: { segment: ContentModelSegment }) {
    const { segment } = props;

    switch (segment.segmentType) {
        case ContentModelSegmentType.Br:
            return <ContentModelBrView br={segment} />;

        case ContentModelSegmentType.Entity:
            return null;

        case ContentModelSegmentType.General:
            return <ContentModelGeneralView model={segment} />;

        case ContentModelSegmentType.Image:
            return <ContentModelImageView image={segment} />;

        case ContentModelSegmentType.SelectionMarker:
            return <ContentModelSelectionMarkerView marker={segment} />;

        case ContentModelSegmentType.Text:
            return <ContentModelTextView text={segment} />;
    }
}
