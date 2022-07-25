import * as containerProcessor from '../../../lib/domToModel/processors/containerProcessor';
import { ContentModelBlock } from '../../../lib/publicTypes/block/ContentModelBlock';
import { ContentModelBlockGroupType } from '../../../lib/publicTypes/enum/BlockGroupType';
import { ContentModelBlockType } from '../../../lib/publicTypes/enum/BlockType';
import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';
import { createFormatContext } from '../../../lib/formatHandlers/createFormatContext';
import { createTableCell } from '../../../lib/domToModel/creators/createTableCell';
import { FormatContext } from '../../../lib/formatHandlers/FormatContext';
import { tableProcessor } from '../../../lib/domToModel/processors/tableProcessor';

describe('tableProcessor', () => {
    let context: FormatContext;

    beforeEach(() => {
        context = createFormatContext(false, 1, false);
        spyOn(containerProcessor, 'containerProcessor');
    });

    function runTest(tableHTML: string, expectedModel: ContentModelBlock) {
        const doc = createContentModelDocument(document);

        const div = document.createElement('div');
        div.innerHTML = tableHTML;

        tableProcessor(doc, div.firstChild as HTMLTableElement, context);

        expect(doc.blocks[0]).toEqual(expectedModel);
    }

    it('Process a regular 1*1 table', () => {
        runTest('<table><tr><td></td></tr></table>', {
            blockType: ContentModelBlockType.Table,
            cells: [
                [
                    {
                        blockType: ContentModelBlockType.BlockGroup,
                        blockGroupType: ContentModelBlockGroupType.TableCell,
                        spanAbove: false,
                        spanLeft: false,
                        isHeader: false,
                        blocks: [],
                        format: {},
                    },
                ],
            ],
            format: {},
        });
    });

    it('Process a regular 2*2 table', () => {
        const tdHTML = '<td></td>';
        const trHTML = `<tr>${tdHTML}${tdHTML}</tr>`;
        const tableHTML = `<table>${trHTML}${trHTML}</table>`;
        const tdModel = createTableCell(1, 1, false, context);

        runTest(tableHTML, {
            blockType: ContentModelBlockType.Table,
            cells: [
                [tdModel, tdModel],
                [tdModel, tdModel],
            ],
            format: {},
        });
    });

    it('Process a 2*2 table with merged cell', () => {
        const tableHTML =
            '<table><tr><td></td><td></td></tr><tr><td colspan="2"></td></tr></table>';
        const tdModel = createTableCell(1, 1, false, context);

        runTest(tableHTML, {
            blockType: ContentModelBlockType.Table,
            cells: [
                [tdModel, tdModel],
                [tdModel, createTableCell(2, 1, false, context)],
            ],
            format: {},
        });
    });

    it('Process a 2*2 table with all cells merged', () => {
        const tableHTML = '<table><tr><td colspan="2" rowspan="2"></td></tr><tr></tr></table>';

        runTest(tableHTML, {
            blockType: ContentModelBlockType.Table,
            cells: [
                [createTableCell(1, 1, false, context), createTableCell(2, 1, false, context)],
                [createTableCell(1, 2, false, context), createTableCell(2, 2, false, context)],
            ],
            format: {},
        });
    });

    it('Process a 1*1 table with text content', () => {
        const tableHTML = '<table><tr><td>test</td></tr></table>';
        const tdModel = createTableCell(1, 1, false, context);

        runTest(tableHTML, {
            blockType: ContentModelBlockType.Table,
            cells: [[tdModel]],
            format: {},
        });

        expect(containerProcessor.containerProcessor).toHaveBeenCalledTimes(1);
    });

    it('Process a 1*2 table with element content', () => {
        const tableHTML =
            '<table><tr><td><span>test</span></td><td><span>test</span></td></tr></table>';
        const tdModel = createTableCell(1, 1, false, context);

        runTest(tableHTML, {
            blockType: ContentModelBlockType.Table,
            cells: [[tdModel, tdModel]],
            format: {},
        });

        expect(containerProcessor.containerProcessor).toHaveBeenCalledTimes(2);
    });

    it('Process a 1*2 table with element content in merged cell', () => {
        const tableHTML = '<table><tr><td colspan="2"><span>test</span></td></tr></table>';
        const tdModel = createTableCell(1, 1, false, context);

        runTest(tableHTML, {
            blockType: ContentModelBlockType.Table,
            cells: [[tdModel, createTableCell(2, 1, false, context)]],
            format: {},
        });

        expect(containerProcessor.containerProcessor).toHaveBeenCalledTimes(1);
    });
});
