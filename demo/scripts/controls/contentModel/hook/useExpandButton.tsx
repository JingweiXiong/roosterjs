import * as React from 'react';

const styles = require('../ContentModel.scss');

export default function useExpandButton(defaultOpen: boolean) {
    const [isExpanded, setExpanded] = React.useState(defaultOpen);

    const toggleExpanded = React.useCallback(() => {
        setExpanded(!isExpanded);
    }, [isExpanded]);

    const button = (
        <span className={styles.button} onClick={toggleExpanded}>
            {isExpanded ? '⬇️' : '➡️'}
        </span>
    );

    return {
        isExpanded,
        button,
    };
}
