import { ContentModelBlockGroup } from '../../publicTypes/block/group/ContentModelBlockGroup';

/**
 * @internal
 */
export type ElementProcessor = (group: ContentModelBlockGroup, element: HTMLElement) => void;
