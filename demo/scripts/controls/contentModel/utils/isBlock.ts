import { ContentModelBlock, ContentModelSegment } from 'roosterjs-content-model';

export default function isBlock(
    model: ContentModelBlock | ContentModelSegment
): model is ContentModelBlock {
    return typeof (<ContentModelBlock>model).blockType === 'number';
}
