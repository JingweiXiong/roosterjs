import * as React from 'react';
import isBlock from '../utils/isBlock';
import { css } from '@fluentui/react/lib/Utilities';
import { safeInstanceOf } from 'roosterjs-editor-dom';
import {
    CompatibleContentModelBlockGroupType,
    CompatibleContentModelBlockType,
    CompatibleContentModelSegmentType,
} from 'roosterjs-content-model/lib/compatibleTypes';
import {
    ContentModelBlock,
    ContentModelBlockGroupType,
    ContentModelBlockType,
    ContentModelParagraphFormat,
    ContentModelSegment,
    ContentModelSegmentFormat,
    ContentModelSegmentType,
    ContentModelTableCellFormat,
    ContentModelTableFormat,
} from 'roosterjs-content-model';

const styles = require('./ContentModel.scss');

export default function ContentModel(props: {
    model: ContentModelBlock | ContentModelSegment;
    isExpanded: boolean;
}) {
    const { model, isExpanded } = props;
    const [title, subTitle] = getTitleOfModel(model);
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
        <div className={styles.modelWrapper + ' ' + getModelContainerClassName(model)}>
            <div
                className={css(styles.selection, {
                    [styles.childSelected]: isChildSelected(model),
                    [styles.selected]: isSelected(model),
                })}></div>
            <div className={styles.body}>
                <div className={styles.titleBar}>
                    <div
                        className={css(styles.title, {
                            [styles.titleWithBorder]: bodyState != 'collapsed',
                        })}>
                        {title}
                    </div>
                    <ButtonGroup
                        model={model}
                        bodyState={bodyState}
                        toggleJson={toggleJson}
                        toggleFormat={toggleFormat}
                        toggleVisual={toggleVisual}
                    />
                    <div
                        className={css(styles.subTitle, {
                            [styles.titleWithBorder]: bodyState != 'collapsed',
                        })}
                        title={subTitle}>
                        {subTitle || '\u00a0'}
                    </div>
                </div>
                {bodyState == 'json' ? (
                    <ContentModelJson model={model} />
                ) : bodyState == 'children' ? (
                    <ContentModelContent model={model} />
                ) : bodyState == 'format' ? (
                    <ContentModelFormat model={model} />
                ) : null}
            </div>
        </div>
    );
}

function getModelContainerClassName(model: ContentModelBlock | ContentModelSegment) {
    if (isBlock(model)) {
        switch (model.blockType) {
            case ContentModelBlockType.BlockGroup:
                switch (model.blockGroupType) {
                    case ContentModelBlockGroupType.Document:
                        return styles.modelDocument;
                    case ContentModelBlockGroupType.TableCell:
                        return styles.modelTableCell;
                    default:
                        return '';
                }
            case ContentModelBlockType.Paragraph:
                return styles.modelParagraph;
            case ContentModelBlockType.Table:
                return styles.modelTable;
            default:
                return '';
        }
    } else {
        switch (model.segmentType) {
            case ContentModelSegmentType.Br:
                return styles.modelBr;
            case ContentModelSegmentType.Image:
                return styles.modelImage;
            case ContentModelSegmentType.SelectionMarker:
                return styles.modelSelectionMarker;
            case ContentModelSegmentType.Text:
                return styles.modelText;
            default:
                return '';
        }
    }
}

function ContentModelJson(props: { model: ContentModelBlock | ContentModelSegment }) {
    const { model } = props;
    return <pre className={styles.json}>{getJSON(model)}</pre>;
}

function ContentModelContent(props: { model: ContentModelBlock | ContentModelSegment }) {
    const { model } = props;
    return <div className={styles.expandedBody}>{getSubModels(model)}</div>;
}

function ContentModelFormat(props: { model: ContentModelBlock | ContentModelSegment }) {
    const { model } = props;
    return <div className={styles.expandedBody}>{getFormats(model)}</div>;
}

function ButtonGroup(props: {
    model: ContentModelBlock | ContentModelSegment;
    bodyState: 'children' | 'format' | 'json' | 'collapsed';
    toggleVisual: () => void;
    toggleFormat: () => void;
    toggleJson: () => void;
}) {
    const { model, bodyState, toggleFormat, toggleJson, toggleVisual } = props;

    return (
        <div className={styles.buttons}>
            <button
                onClick={toggleVisual}
                className={css(styles.button, {
                    [styles.buttonChecked]: bodyState == 'children',
                })}>
                Child models
            </button>
            {hasFormat(model) ? (
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

function isSelected(model: ContentModelBlock | ContentModelSegment) {
    if (isBlock(model)) {
        return (
            model.blockType == ContentModelBlockType.BlockGroup &&
            model.blockGroupType == ContentModelBlockGroupType.TableCell &&
            model.isSelected
        );
    } else {
        return model.isSelected;
    }
}

function isChildSelected(model: ContentModelBlock | ContentModelSegment) {
    if (isBlock(model)) {
        switch (model.blockType) {
            case ContentModelBlockType.BlockGroup:
                return model.blocks.some(isChildSelected);
            case ContentModelBlockType.Paragraph:
                return model.segments.some(isChildSelected);
            case ContentModelBlockType.Table:
                return model.cells.some(row => row.some(isChildSelected));
            default:
                return false;
        }
    } else {
        return model.isSelected;
    }
}

function getTitleOfModel(model: ContentModelBlock | ContentModelSegment): [string, string] {
    if (isBlock(model)) {
        switch (model.blockType) {
            case ContentModelBlockType.BlockGroup:
                switch (model.blockGroupType) {
                    case ContentModelBlockGroupType.Document:
                        return ['Document', model.document.location.href];

                    case ContentModelBlockGroupType.TableCell:
                        return [
                            'TableCell',
                            model.spanAbove && model.spanLeft
                                ? '↖'
                                : model.spanLeft
                                ? '←'
                                : model.spanAbove
                                ? '↑'
                                : model.isHeader
                                ? 'TH'
                                : 'TD',
                        ];

                    default:
                        return ['BlockGroup', ''];
                }

            case ContentModelBlockType.Paragraph:
                return ['Paragraph', model.isImplicit ? ' (Implicit)' : ''];

            case ContentModelBlockType.Table:
                return ['Table', `${model.cells.length} x ${model.cells[0]?.length || 0}`];

            default:
                return ['Block', ''];
        }
    } else {
        switch (model.segmentType) {
            case ContentModelSegmentType.Br:
                return ['BR', ''];

            case ContentModelSegmentType.Image:
                return ['Image', model.src];

            case ContentModelSegmentType.SelectionMarker:
                return ['SelectionMarker', ''];

            case ContentModelSegmentType.Text:
                return ['Text: ', model.text];

            default:
                return ['Segment', ''];
        }
    }
}

function getSubModels(model: ContentModelBlock | ContentModelSegment) {
    if (isBlock(model)) {
        switch (model.blockType) {
            case ContentModelBlockType.BlockGroup:
                switch (model.blockGroupType) {
                    case ContentModelBlockGroupType.TableCell:
                        return (
                            <>
                                <div>
                                    <input type="checkbox" checked={model.isHeader} />
                                    Header
                                </div>
                                <div>
                                    <input type="checkbox" checked={model.spanLeft} />
                                    Span Left
                                </div>
                                <div>
                                    <input type="checkbox" checked={model.spanAbove} />
                                    Span Above
                                </div>
                                {model.blocks.map(block => (
                                    <ContentModel model={block} isExpanded={true} />
                                ))}
                            </>
                        );

                    default:
                        return model.blocks.map(block => (
                            <ContentModel model={block} isExpanded={true} />
                        ));
                }

            case ContentModelBlockType.Paragraph:
                return model.segments.map(paragraph => (
                    <ContentModel model={paragraph} isExpanded={true} />
                ));

            case ContentModelBlockType.Table:
                return model.cells.map(row => (
                    <div className={styles.tableRow}>
                        {row.map(cell => (
                            <ContentModel model={cell} isExpanded={false} />
                        ))}
                    </div>
                ));

            default:
                return null;
        }
    } else {
        switch (model.segmentType) {
            case ContentModelSegmentType.Br:
                return null;

            case ContentModelSegmentType.Image:
                return (
                    <div>
                        <input type="text" value={model.src} />
                        <br />
                        <img src={model.src} style={{ maxWidth: '100px' }} />
                    </div>
                );

            case ContentModelSegmentType.SelectionMarker:
                return (
                    <div>
                        <input type="checkbox" checked={model.isSelected} />
                        Selected
                    </div>
                );

            case ContentModelSegmentType.Text:
                return <input type="input" value={model.text} />;

            default:
                return null;
        }
    }
}

function hasFormat(model: ContentModelBlock | ContentModelSegment) {
    if (isBlock(model)) {
        switch (model.blockType) {
            case ContentModelBlockType.BlockGroup:
                switch (model.blockGroupType) {
                    case ContentModelBlockGroupType.TableCell:
                        return true;

                    default:
                        return false;
                }

            case ContentModelBlockType.Table:
            case ContentModelBlockType.Paragraph:
                return true;

            default:
                return false;
        }
    } else {
        return true;
    }
}

function getFormats(model: ContentModelBlock | ContentModelSegment) {
    if (isBlock(model)) {
        switch (model.blockType) {
            case ContentModelBlockType.BlockGroup:
                switch (model.blockGroupType) {
                    case ContentModelBlockGroupType.TableCell:
                        return <TableCellFormatPane format={model.format} />;

                    default:
                        return null;
                }

            case ContentModelBlockType.Table:
                return <TableFormatPane format={model.format} />;

            case ContentModelBlockType.Paragraph:
                return <ParagraphFormatPane format={model.format} />;

            default:
                return null;
        }
    } else {
        return <SegmentFormatPane format={model.format} />;
    }
}

function TableCellFormatPane(props: { format: ContentModelTableCellFormat }) {
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

function TableFormatPane(props: { format: ContentModelTableFormat }) {
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

function ParagraphFormatPane(props: { format: ContentModelParagraphFormat }) {
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

function SegmentFormatPane(props: { format: ContentModelSegmentFormat }) {
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

function getJSON(model: ContentModelBlock | ContentModelSegment) {
    return JSON.stringify(
        model,
        (key, value) => {
            if (safeInstanceOf(value, 'HTMLElement')) {
                return (
                    Object.prototype.toString.apply(value) +
                    ': ' +
                    (value.cloneNode() as HTMLElement).outerHTML
                );
            } else if (safeInstanceOf(value, 'Node')) {
                return Object.prototype.toString.apply(value);
            } else if (key == 'blockType') {
                return CompatibleContentModelBlockType[value];
            } else if (key == 'blockGroupType') {
                return CompatibleContentModelBlockGroupType[value];
            } else if (key == 'segmentType') {
                return CompatibleContentModelSegmentType[value];
            }

            return value;
        },
        2
    );
}
