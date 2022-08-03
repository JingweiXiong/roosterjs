import * as React from 'react';
import { ContentModel } from '../ContentModel';
import { ContentModelBr } from 'roosterjs-content-model';
import { SegmentFormatView } from '../format/SegmentFormatView';

const styles = require('./ContentModelBrView.scss');

export function ContentModelBrView(props: { br: ContentModelBr }) {
    const { br } = props;
    const getFormat = React.useCallback(() => {
        return <SegmentFormatView format={br.format} />;
    }, [br.format]);

    return (
        <ContentModel
            title="BR"
            subTitle=""
            isExpanded={false}
            className={styles.modelBr}
            hasSelection={false}
            isSelected={br.isSelected}
            jsonSource={br}
            getContent={null}
            getFormat={getFormat}
        />
    );
}
