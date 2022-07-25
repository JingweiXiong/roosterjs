import * as React from 'react';
import ContentModelDocumentComponent from './ContentModelDocumentComponent';
import ContentModelParagraphComponent from './ContentModelParagraphComponent';
import ContentModelTableCellComponent from './ContentModelTableCellComponent';
import ContentModelTableComponent from './ContentModelTableComponent';
import {
    ContentModelBlock,
    ContentModelBlockGroup,
    ContentModelBlockGroupType,
    ContentModelBlockType,
} from 'roosterjs-content-model';

export default function renderContentModelBlock(block: ContentModelBlock) {
    switch (block.blockType) {
        case ContentModelBlockType.BlockGroup:
            return renderContentModelBlockGroup(block);
        case ContentModelBlockType.Paragraph:
            return <ContentModelParagraphComponent paragraph={block} />;
        case ContentModelBlockType.Table:
            return <ContentModelTableComponent table={block} />;
        default:
            return null;
    }
}

function renderContentModelBlockGroup(group: ContentModelBlockGroup) {
    switch (group.blockGroupType) {
        case ContentModelBlockGroupType.Document:
            return <ContentModelDocumentComponent doc={group} />;
        case ContentModelBlockGroupType.TableCell:
            return <ContentModelTableCellComponent cell={group} />;
        default:
            return null;
    }
}
