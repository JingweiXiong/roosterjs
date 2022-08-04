import * as React from 'react';
import { ContentModelBlockGroup, ContentModelBlockGroupType } from 'roosterjs-content-model';
import { ContentModelDocumentView } from './ContentModelDocumentView';
import { ContentModelTableCellView } from './ContentModelTableCellView';

export function ContentModelBlockGroupView(props: { group: ContentModelBlockGroup }) {
    const { group } = props;

    switch (group.blockGroupType) {
        case ContentModelBlockGroupType.Code:
            return null;

        case ContentModelBlockGroupType.Document:
            return <ContentModelDocumentView doc={group} />;

        case ContentModelBlockGroupType.General:
            return null;

        case ContentModelBlockGroupType.Header:
            return null;

        case ContentModelBlockGroupType.ListItem:
            return null;

        case ContentModelBlockGroupType.Quote:
            return null;

        case ContentModelBlockGroupType.TableCell:
            return <ContentModelTableCellView cell={group} />;
    }
}
