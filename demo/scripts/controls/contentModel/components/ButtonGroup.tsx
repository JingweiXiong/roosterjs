import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';

const styles = require('./ButtonGroup.scss');

export function ButtonGroup(props: {
    hasFormat: boolean;
    bodyState: 'children' | 'format' | 'json' | 'collapsed';
    toggleVisual: () => void;
    toggleFormat: () => void;
    toggleJson: () => void;
}) {
    const { hasFormat, bodyState, toggleFormat, toggleJson, toggleVisual } = props;

    return (
        <div className={styles.buttons}>
            <button
                onClick={toggleVisual}
                className={css(styles.button, {
                    [styles.buttonChecked]: bodyState == 'children',
                })}>
                Content
            </button>
            {hasFormat ? (
                <button
                    onClick={toggleFormat}
                    className={css(styles.button, {
                        [styles.buttonChecked]: bodyState == 'format',
                    })}>
                    Format
                </button>
            ) : null}
            <button
                onClick={toggleJson}
                className={css(styles.button, {
                    [styles.buttonChecked]: bodyState == 'json',
                })}>
                JSON
            </button>
            <button className={styles.button}>❌</button>
        </div>
    );
}
