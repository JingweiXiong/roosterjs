import { ContentModelSegment, ContentModelSegmentType } from 'roosterjs-content-model';
import type { CompatibleContentModelSegmentType } from 'roosterjs-content-model/lib/compatibleTypes';

const styles = require('../ContentModel.scss');

export default function getSegmentClassName(segment: ContentModelSegment) {
    const classNames: string[] = [getDefaultClassName(segment.segmentType)];

    if (segment.isSelected) {
        classNames.push(styles.selected);
    }

    return classNames.join(' ');
}

function getDefaultClassName(type: ContentModelSegmentType | CompatibleContentModelSegmentType) {
    switch (type) {
        case ContentModelSegmentType.Br:
            return styles.br;

        case ContentModelSegmentType.Text:
            return styles.text;

        case ContentModelSegmentType.SelectionMarker:
            return styles.selectionMarker;

        case ContentModelSegmentType.Image:
            return styles.image;

        default:
            return '';
    }
}
