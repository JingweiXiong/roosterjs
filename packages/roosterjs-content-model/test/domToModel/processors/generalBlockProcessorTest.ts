import * as containerProcessor from '../../../lib/domToModel/processors/containerProcessor';
import * as createGeneralBlock from '../../../lib/domToModel/creators/createGeneralBlock';
import { ContentModelGeneralBlock } from '../../../lib/publicTypes/block/group/ContentModelGeneralBlock';
import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';
import { createFormatContext } from '../../../lib/formatHandlers/createFormatContext';
import { FormatContext } from '../../../lib/formatHandlers/FormatContext';
import { generalBlockProcessor } from '../../../lib/domToModel/processors/generalBlockProcessor';

describe('generalBlockProcessor', () => {
    let context: FormatContext;

    beforeEach(() => {
        spyOn(containerProcessor, 'containerProcessor');
        context = createFormatContext();
    });

    it('Process a DIV element', () => {
        const doc = createContentModelDocument(document);
        const div = document.createElement('div');
        const block: ContentModelGeneralBlock = {
            blockType: 'BlockGroup',
            blockGroupType: 'General',
            element: div,
            blocks: [],
        };

        spyOn(createGeneralBlock, 'createGeneralBlock').and.returnValue(block);
        generalBlockProcessor(doc, div, context);

        expect(doc).toEqual({
            blockType: 'BlockGroup',
            blockGroupType: 'Document',
            blocks: [block],
            document: document,
        });
        expect(createGeneralBlock.createGeneralBlock).toHaveBeenCalledTimes(1);
        expect(createGeneralBlock.createGeneralBlock).toHaveBeenCalledWith(div);
        expect(containerProcessor.containerProcessor).toHaveBeenCalledTimes(1);
        expect(containerProcessor.containerProcessor).toHaveBeenCalledWith(block, div, context);
    });
});
