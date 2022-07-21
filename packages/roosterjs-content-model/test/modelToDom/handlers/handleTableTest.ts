import * as handleBlock from '../../../lib/modelToDom/handlers/handleBlock';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { ContentModelTable } from '../../../lib/publicTypes/block/ContentModelTable';
import { createFormatContext } from '../../../lib/formatHandlers/createFormatContext';
import { createTableCell } from '../../../lib/domToModel/creators/createTableCell';
import { FormatContext } from '../../../lib/formatHandlers/FormatContext';
import { handleTable } from '../../../lib/modelToDom/handlers/handleTable';
import { SelectionInfo } from '../../../lib/modelToDom/types/SelectionInfo';

describe('handleTable', () => {
    let context: FormatContext;
    let selectionInfo: SelectionInfo;

    beforeEach(() => {
        spyOn(handleBlock, 'handleBlock');
        context = createFormatContext();
        selectionInfo = {
            context: {
                currentBlockNode: null,
                currentSegmentNode: null,
            },
        };
    });

    function runTest(model: ContentModelTable, expectedInnerHTML: string) {
        const div = document.createElement('div');
        handleTable(document, div, model, context, selectionInfo);
        expect(div.innerHTML).toBe(expectedInnerHTML);
    }

    it('Empty table', () => {
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [],
                format: {},
            },
            ''
        );
    });

    it('Table with all empty rows', () => {
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [[], []],
                format: {},
            },
            ''
        );
    });

    it('Regular 1 * 1 table', () => {
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [[createTableCell(context, 1, 1, false)]],
                format: {},
            },
            '<table><tbody><tr><td></td></tr></tbody></table>'
        );
    });

    it('Regular 2 * 2 table', () => {
        const tdModel = createTableCell(context, 1, 1, false);
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [
                    [tdModel, tdModel],
                    [tdModel, tdModel],
                ],
                format: {},
            },
            '<table><tbody><tr><td></td><td></td></tr><tr><td></td><td></td></tr></tbody></table>'
        );
    });

    it('3 * 1 table with empty row', () => {
        const tdModel = createTableCell(context, 1, 1, false);
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [[tdModel], [], [tdModel]],
                format: {},
            },
            '<table><tbody><tr><td></td></tr><tr><td></td></tr></tbody></table>'
        );
    });

    it('Table with spanLeft cell', () => {
        const tdModel = createTableCell(context, 1, 1, false);
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [
                    [tdModel, createTableCell(context, 2, 1, false)],
                    [tdModel, tdModel],
                ],
                format: {},
            },
            '<table><tbody><tr><td colspan="2"></td></tr><tr><td></td><td></td></tr></tbody></table>'
        );
    });

    it('Table with spanAbove cell', () => {
        const tdModel = createTableCell(context, 1, 1, false);
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [
                    [tdModel, tdModel],
                    [createTableCell(context, 1, 2, false), tdModel],
                ],
                format: {},
            },
            '<table><tbody><tr><td rowspan="2"></td><td></td></tr><tr><td></td></tr></tbody></table>'
        );
    });

    it('Table with spanAbove and spanLeft cell', () => {
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [
                    [createTableCell(context, 1, 1, false), createTableCell(context, 2, 1, false)],
                    [createTableCell(context, 1, 2, false), createTableCell(context, 2, 2, false)],
                ],
                format: {},
            },
            '<table><tbody><tr><td rowspan="2" colspan="2"></td></tr><tr></tr></tbody></table>'
        );
    });

    it('Complex table', () => {
        // +--+-----+
        // |  |     |
        // |  +--+--+
        // |  |  |  |
        // +--+--+  |
        // |     |  |
        // +-----+--+
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [
                    [
                        createTableCell(context, 1, 1, false),
                        createTableCell(context, 1, 1, false),
                        createTableCell(context, 2, 1, false),
                    ],
                    [
                        createTableCell(context, 1, 2, false),
                        createTableCell(context, 1, 1, false),
                        createTableCell(context, 1, 1, false),
                    ],
                    [
                        createTableCell(context, 1, 1, false),
                        createTableCell(context, 2, 1, false),
                        createTableCell(context, 1, 2, false),
                    ],
                ],
                format: {},
            },
            '<table><tbody>' +
                '<tr><td rowspan="2"></td><td colspan="2"></td></tr>' +
                '<tr><td></td><td rowspan="2"></td></tr>' +
                '<tr><td colspan="2"></td></tr>' +
                '</tbody></table>'
        );
    });

    it('Table with header', () => {
        runTest(
            {
                blockType: ContentModelBlockType.Table,
                cells: [
                    [createTableCell(context, 1, 1, true)],
                    [createTableCell(context, 1, 1, false)],
                ],
                format: {},
            },
            '<table><tbody><tr><th></th></tr><tr><td></td></tr></tbody></table>'
        );
    });
});
