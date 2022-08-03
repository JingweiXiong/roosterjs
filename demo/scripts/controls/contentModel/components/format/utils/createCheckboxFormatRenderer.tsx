import * as React from 'react';
import { FormatRenderer } from './FormatRenderer';

function CheckboxFormatItem<TFormat>(props: {
    name: string;
    format: TFormat;
    getter: (format: TFormat) => boolean;
    setter?: (format: TFormat, newValue: boolean) => void;
}) {
    const { name, getter, setter, format } = props;
    const checkbox = React.useRef<HTMLInputElement>(null);
    const onChange = React.useCallback(() => {
        setter?.(format, checkbox.current.checked);
    }, [format, setter]);

    return (
        <tr>
            <td>{name}</td>
            <td>
                <input type="checkbox" ref={checkbox} checked={getter(format)} onClick={onChange} />
            </td>
        </tr>
    );
}

export function createCheckboxFormatRenderer<T>(
    name: string,
    getter: (format: T) => boolean,
    setter?: (format: T, newValue: boolean) => void
): FormatRenderer<T> {
    return (format: T) => (
        <CheckboxFormatItem name={name} getter={getter} setter={setter} format={format} />
    );
}
