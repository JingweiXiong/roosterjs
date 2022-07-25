import * as React from 'react';
import ContentModelBrComponent from './ContentModelBrComponent';
import ContentModelIMageComponent from './ContentModelImageComponent';
import ContentModelSelectionMarkerComponent from './ContentModelSelectionMarkerComponent';
import ContentModelTextComponent from './ContentModelTextComponent';
import { ContentModelSegment, ContentModelSegmentType } from 'roosterjs-content-model';

export default function renderContentModelSegment(segment: ContentModelSegment) {
    switch (segment.segmentType) {
        case ContentModelSegmentType.Text:
            return <ContentModelTextComponent text={segment} />;
        case ContentModelSegmentType.Br:
            return <ContentModelBrComponent br={segment} />;
        case ContentModelSegmentType.SelectionMarker:
            return <ContentModelSelectionMarkerComponent marker={segment} />;
        case ContentModelSegmentType.Image:
            return <ContentModelIMageComponent image={segment} />;
        default:
            return null;
    }
}
