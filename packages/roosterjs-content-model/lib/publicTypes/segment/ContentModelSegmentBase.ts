import { ContentModelSegmentFormat } from '../format/ContentModelSegmentFormat';
import { ContentModelSegmentType } from '../enum/SegmentType';
import type { CompatibleContentModelSegmentType } from '../compatibleEnum/SegmentType';

/**
 * Base type of Content Model Segment
 */
export interface ContentModelSegmentBase<
    T extends ContentModelSegmentType | CompatibleContentModelSegmentType
> {
    /**
     * Type of this segment
     */
    segmentType: T;

    /**
     * Format of this segment
     */
    format: ContentModelSegmentFormat;

    /**
     * Whether this segment is selected
     */
    isSelected?: boolean;
}
