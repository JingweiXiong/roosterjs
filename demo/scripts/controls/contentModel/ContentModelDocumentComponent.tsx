import * as React from 'react';
import renderContentModelBlock from './renderContentModelBlock';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelDocument } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelDocumentComponent(props: { doc: ContentModelDocument }) {
    const { doc } = props;
    const { isExpanded, button } = useExpandButton(true);

    return (
        <div className={styles.block}>
            {useTitle('Block/BlockGroup/Document')}
            {button}
            <span>{doc.document.location.href}</span>
            {isExpanded ? (
                <div className={styles.child}>{doc.blocks.map(renderContentModelBlock)}</div>
            ) : null}
        </div>
    );
}
