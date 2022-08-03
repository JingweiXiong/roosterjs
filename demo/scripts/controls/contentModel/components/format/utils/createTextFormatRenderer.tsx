import * as React from 'react';
import { FormatRenderer } from './FormatRenderer';

function TextFormatItem<T>(props: {
    name: string;
    format: T;
    getter: (format: T) => string;
    setter?: (format: T, newValue: string) => void;
    type: 'text' | 'number' | 'color' | 'multiline';
}) {
    const { name, getter, setter, format, type } = props;
    const singleLineBox = React.useRef<HTMLInputElement>(null);
    const multiLineBox = React.useRef<HTMLTextAreaElement>(null);

    const onSingleLineChange = React.useCallback(() => {
        setter?.(format, singleLineBox.current.value);
    }, [format, setter]);

    const onMultiLineChange = React.useCallback(() => {
        setter?.(format, multiLineBox.current.value);
    }, [format, setter]);

    return (
        <tr>
            <td>{name}</td>
            <td>
                {type == 'multiline' ? (
                    <textarea ref={multiLineBox} onChange={onMultiLineChange}>
                        {getter(format)}
                    </textarea>
                ) : (
                    <input
                        type={type}
                        ref={singleLineBox}
                        value={getter(format)}
                        onChange={onSingleLineChange}
                    />
                )}
            </td>
        </tr>
    );
}

export function createTextFormatRenderer<T>(
    name: string,
    getter: (format: T) => string,
    setter?: (format: T, newValue: string) => void,
    type: 'text' | 'number' | 'color' | 'multiline' = 'text'
): FormatRenderer<T> {
    return (format: T) => (
        <TextFormatItem name={name} getter={getter} setter={setter} format={format} type={type} />
    );
}
