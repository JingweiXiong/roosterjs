import * as React from 'react';
import ContentModelParagraphFormatComponent from './subComponents/ContentModelParagraphFormatComponent';
import renderContentModelSegment from './renderContentModelSegment';
import useExpandButton from './hook/useExpandButton';
import useTitle from './hook/useTitle';
import { ContentModelParagraph } from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModelParagraphComponent(props: {
    paragraph: ContentModelParagraph;
}) {
    const { paragraph } = props;
    const { isExpanded, button } = useExpandButton(true);

    return (
        <div className={styles.block}>
            {useTitle('Block/Paragraph')}
            {button}
            <input type="checkbox" checked={paragraph.isImplicit} />
            Implicit
            {isExpanded ? (
                <div className={styles.child}>
                    <div>
                        Format: <ContentModelParagraphFormatComponent format={paragraph.format} />
                    </div>
                    <div>{paragraph.segments.map(renderContentModelSegment)}</div>
                </div>
            ) : null}
        </div>
    );
}
