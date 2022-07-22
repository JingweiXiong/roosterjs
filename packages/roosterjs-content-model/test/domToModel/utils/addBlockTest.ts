import { addBlock } from '../../../lib/domToModel/utils/addBlock';
import { ContentModelBlock } from '../../../lib/publicTypes/block/ContentModelBlock';
import { createContentModelDocument } from '../../../lib/domToModel/creators/createContentModelDocument';

describe('addBlock', () => {
    it('add simple block', () => {
        const doc = createContentModelDocument(document);
        const block: ContentModelBlock = {
            blockType: 'Paragraph',
            segments: [],
        };

        addBlock(doc, block);

        expect(doc).toEqual({
            blockType: 'BlockGroup',
            blockGroupType: 'Document',
            blocks: [block],
            document: document,
        });
    });
});
