import * as React from 'react';
import { ContentModelTableCellFormat } from 'roosterjs-content-model';

export function TableCellFormatView(props: { format: ContentModelTableCellFormat }) {
    const { format } = props;
    return (
        <table>
            <tr>
                <td>Width</td>
                <td>
                    <input type="number" value={format.width} />
                </td>
            </tr>
            <tr>
                <td>Height</td>
                <td>
                    <input type="number" value={format.height} />
                </td>
            </tr>
            <tr>
                <td>BorderWidth</td>
                <td>
                    <table>
                        <tr>
                            <td>Top:</td>
                            <td>
                                <input type="text" value={format.borderWidth?.[0]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Right: </td>
                            <td>
                                <input type="text" value={format.borderWidth?.[1]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Bottom:</td>
                            <td>
                                <input type="text" value={format.borderWidth?.[2]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Left:</td>
                            <td>
                                <input type="text" value={format.borderWidth?.[3]} />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>BorderStyle</td>
                <td>
                    <table>
                        <tr>
                            <td>Top:</td>
                            <td>
                                <input type="text" value={format.borderStyle?.[0]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Right:</td>
                            <td>
                                <input type="text" value={format.borderStyle?.[1]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Bottom:</td>
                            <td>
                                <input type="text" value={format.borderStyle?.[2]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Left:</td>
                            <td>
                                <input type="text" value={format.borderStyle?.[3]} />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>BorderColor</td>
                <td>
                    <table>
                        <tr>
                            <td>Top:</td>
                            <td>
                                <input type="text" value={format.borderColor?.[0]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Right:</td>
                            <td>
                                <input type="text" value={format.borderColor?.[1]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Bottom:</td>
                            <td>
                                <input type="text" value={format.borderColor?.[2]} />
                            </td>
                        </tr>
                        <tr>
                            <td>Left:</td>
                            <td>
                                <input type="text" value={format.borderColor?.[3]} />
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>BackgroundColor</td>
                <td>
                    <input type="text" value={format.backgroundColor} />
                </td>
            </tr>
            <tr>
                <td>TextAlign</td>
                <td>
                    <input type="text" value={format.textAlign} />
                </td>
            </tr>
            <tr>
                <td>VerticalAlign</td>
                <td>
                    <input type="text" value={format.verticalAlign} />
                </td>
            </tr>
        </table>
    );
}
