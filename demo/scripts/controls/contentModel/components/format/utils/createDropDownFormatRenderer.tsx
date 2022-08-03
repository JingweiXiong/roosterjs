import * as React from 'react';
import { FormatRenderer } from './FormatRenderer';

function DropDownFormatItem<TFormat, TOption extends string>(props: {
    name: string;
    format: TFormat;
    options: TOption[];
    getter: (format: TFormat) => TOption | undefined;
    setter?: (format: TFormat, newValue: TOption | undefined) => void;
}) {
    const { name, getter, setter, format, options } = props;
    const dropDown = React.useRef<HTMLSelectElement>(null);
    const onChange = React.useCallback(() => {
        setter?.(
            format,
            dropDown.current.value == '' ? undefined : (dropDown.current.value as TOption)
        );
    }, [format, setter]);

    const value = getter(format);

    return (
        <tr>
            <td>{name}</td>
            <td>
                <select ref={dropDown} value={value === undefined ? '' : value} onChange={onChange}>
                    <option value=""></option>
                    {options.map(o => (
                        <option value={o}>{o}</option>
                    ))}
                </select>
            </td>
        </tr>
    );
}

export function createDropDownFormatRenderer<T, O extends string>(
    name: string,
    options: O[],
    getter: (format: T) => O,
    setter?: (format: T, newValue: O) => void
): FormatRenderer<T> {
    return (format: T) => (
        <DropDownFormatItem
            name={name}
            getter={getter}
            setter={setter}
            format={format}
            options={options}
        />
    );
}
