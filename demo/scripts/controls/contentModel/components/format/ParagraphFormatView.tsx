import * as React from 'react';
import { ContentModelParagraphFormat } from 'roosterjs-content-model';

export function ParagraphFormatView(props: { format: ContentModelParagraphFormat }) {
    const { format } = props;
    return (
        <table>
            <tr>
                <td>BackgroundColor</td>
                <td>
                    <input type="text" value={format.backgroundColor} />
                </td>
            </tr>
            <tr>
                <td>Direction</td>
                <td>
                    <input type="text" value={format.direction} />
                </td>
            </tr>
            <tr>
                <td>TextAlignment</td>
                <td>
                    <input type="text" value={format.textAlign} />
                </td>
            </tr>
            <tr>
                <td>MarginTop</td>
                <td>
                    <input type="text" value={format.marginTop} />
                </td>
            </tr>
            <tr>
                <td>MarginBottom</td>
                <td>
                    <input type="text" value={format.marginBottom} />
                </td>
            </tr>
            <tr>
                <td>MarginLeft</td>
                <td>
                    <input type="text" value={format.marginLeft} />
                </td>
            </tr>
            <tr>
                <td>Indentation</td>
                <td>
                    <input type="text" value={format.indentation} />
                </td>
            </tr>
            <tr>
                <td>LineHeight</td>
                <td>
                    <input type="text" value={format.lineHeight} />
                </td>
            </tr>
            <tr>
                <td>WhiteSpace</td>
                <td>
                    <input type="text" value={format.whiteSpace} />
                </td>
            </tr>
        </table>
    );
}
