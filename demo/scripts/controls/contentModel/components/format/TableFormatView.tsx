import * as React from 'react';
import { ContentModelTableFormat } from 'roosterjs-content-model';

export function TableFormatView(props: { format: ContentModelTableFormat }) {
    const { format } = props;
    return (
        <table>
            <tr>
                <td>Id</td>
                <td>
                    <input type="text" value={format.id} />
                </td>
            </tr>
            <tr>
                <td>BorderCollapsed</td>
                <td>
                    <input type="checkbox" checked={format.borderCollapse} />
                </td>
            </tr>
            <tr>
                <td>BackgroundColor</td>
                <td>
                    <input type="text" value={format.backgroundColor} />
                </td>
            </tr>
            <tr>
                <td>Metadata</td>
                <td>
                    <textarea>{JSON.stringify(format.metadata, null, 2)}</textarea>
                </td>
            </tr>
        </table>
    );
}
