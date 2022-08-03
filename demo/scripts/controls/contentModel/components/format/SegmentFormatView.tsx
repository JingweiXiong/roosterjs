import * as React from 'react';
import { ContentModelSegmentFormat } from 'roosterjs-content-model';

export function SegmentFormatView(props: { format: ContentModelSegmentFormat }) {
    const { format } = props;
    return (
        <table>
            <tr>
                <td>TextColor</td>
                <td>
                    <input type="text" value={format.textColor} />
                </td>
            </tr>
            <tr>
                <td>BackgroundColor</td>
                <td>
                    <input type="text" value={format.backgroundColor} />
                </td>
            </tr>
            <tr>
                <td>FontSize</td>
                <td>
                    <input type="text" value={format.fontSize} />
                </td>
            </tr>
            <tr>
                <td>FontFamily</td>
                <td>
                    <input type="text" value={format.fontFamily} />
                </td>
            </tr>
            <tr>
                <td>Bold</td>
                <td>
                    <input type="checkbox" checked={format.bold} />
                </td>
            </tr>
            <tr>
                <td>Italic</td>
                <td>
                    <input type="checkbox" checked={format.italic} />
                </td>
            </tr>
            <tr>
                <td>Underline</td>
                <td>
                    <input type="checkbox" checked={format.underline} />
                </td>
            </tr>
            <tr>
                <td>Strike</td>
                <td>
                    <input type="checkbox" checked={format.strikethrough} />
                </td>
            </tr>
            <tr>
                <td>Superscript</td>
                <td>
                    <input type="checkbox" checked={format.superscript} />
                </td>
            </tr>
            <tr>
                <td>Subscript</td>
                <td>
                    <input type="checkbox" checked={format.subscript} />
                </td>
            </tr>
            <tr>
                <td>HyperLinkHref</td>
                <td>
                    <input type="text" value={format.linkHref} />
                </td>
            </tr>
            <tr>
                <td>HyperLinkTarget</td>
                <td>
                    <input type="text" value={format.linkTarget} />
                </td>
            </tr>
        </table>
    );
}
