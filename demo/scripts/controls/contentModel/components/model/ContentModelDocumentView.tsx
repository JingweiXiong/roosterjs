import * as React from 'react';
import { ContentModel } from '../ContentModel';
import { ContentModelBlockView } from './ContentModelBlockView';
import { ContentModelDocument, hasSelectionInBlock } from 'roosterjs-content-model';

const styles = require('./ContentModelDocumentView.scss');

export function ContentModelDocumentView(props: { doc: ContentModelDocument }) {
    const { doc } = props;
    const getContent = React.useCallback(() => {
        return (
            <>
                {doc.blocks.map(block => (
                    <ContentModelBlockView block={block} />
                ))}
            </>
        );
    }, [doc]);

    return (
        <ContentModel
            title="Document"
            subTitle={doc.document.location.href}
            isExpanded={false}
            className={styles.modelDocument}
            hasSelection={hasSelectionInBlock(doc)}
            isSelected={false}
            jsonSource={doc}
            getContent={getContent}
            getFormat={null}
        />
    );
}
