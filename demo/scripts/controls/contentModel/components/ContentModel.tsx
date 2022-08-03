import * as React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { ContentModelJson } from './model/ContentModelJson';
import { css } from '@fluentui/react/lib/Utilities';

const styles = require('./ContentModel.scss');

export function ContentModel(props: {
    className: string;
    title: string;
    subTitle: string;
    hasSelection: boolean;
    isSelected: boolean;
    jsonSource: Object;
    getContent: (() => JSX.Element) | null;
    getFormat: (() => JSX.Element) | null;
    isExpanded: boolean;
}) {
    const {
        title,
        subTitle,
        isExpanded,
        className,
        hasSelection,
        isSelected: isSelection,
        jsonSource,
        getContent,
        getFormat,
    } = props;
    const [bodyState, setBodyState] = React.useState<'collapsed' | 'children' | 'format' | 'json'>(
        isExpanded ? 'children' : 'collapsed'
    );

    const toggleVisual = React.useCallback(() => {
        setBodyState(bodyState == 'children' ? 'collapsed' : 'children');
    }, [bodyState]);

    const toggleFormat = React.useCallback(() => {
        setBodyState(bodyState == 'format' ? 'collapsed' : 'format');
    }, [bodyState]);

    const toggleJson = React.useCallback(() => {
        setBodyState(bodyState == 'json' ? 'collapsed' : 'json');
    }, [bodyState]);

    return (
        <div
            className={css(styles.modelWrapper, className, {
                [styles.childSelected]: hasSelection,
                [styles.selected]: isSelection,
            })}>
            <div className={styles.titleBar}>
                <div
                    className={css(styles.title, {
                        [styles.titleWithBorder]: bodyState != 'collapsed',
                    })}>
                    {title}
                </div>
                <div className={styles.buttonGroup}>
                    <ButtonGroup
                        hasFormat={!!getFormat}
                        bodyState={bodyState}
                        toggleJson={toggleJson}
                        toggleFormat={toggleFormat}
                        toggleVisual={toggleVisual}
                    />
                </div>
                <div
                    className={css(styles.subTitle, {
                        [styles.titleWithBorder]: bodyState != 'collapsed',
                    })}
                    title={subTitle}>
                    {subTitle || '\u00a0'}
                </div>
            </div>
            {bodyState == 'json' ? (
                <ContentModelJson jsonSource={jsonSource} />
            ) : bodyState == 'children' ? (
                <div className={styles.expandedBody}>{getContent?.() || null}</div>
            ) : bodyState == 'format' && !!getFormat ? (
                <div className={styles.expandedBody}>{getFormat()}</div>
            ) : null}
        </div>
    );
}
