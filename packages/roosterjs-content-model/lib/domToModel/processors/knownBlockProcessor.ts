import { addBlock } from '../utils/addBlock';
import { containerProcessor } from './containerProcessor';
import { createParagraph } from '../creators/createParagraph';
import { ElementProcessor } from './ElementProcessor';
import { ParagraphFormatHandlers } from '../../formatHandlers/ParagraphFormatHandlers';
import { SegmentFormatHandlers } from '../../formatHandlers/SegmentFormatHandlers';

/**
 * @internal
 */
export const knownBlockProcessor: ElementProcessor = (group, element, context, defaultStyle) => {
    const originalBlockFormat = context.blockFormat;
    const originalSegmentFormat = context.segmentFormat;

    context.blockFormat = {
        ...originalBlockFormat,
    };
    context.segmentFormat = { ...originalSegmentFormat };

    ParagraphFormatHandlers.forEach(handler =>
        handler.parse(context.blockFormat, element, context, defaultStyle)
    );
    SegmentFormatHandlers.forEach(handler =>
        handler.parse(context.segmentFormat, element, context, defaultStyle)
    );

    addBlock(group, createParagraph(false /*isImplicit*/, context));

    containerProcessor(group, element, context);
    context.blockFormat = originalBlockFormat;
    context.segmentFormat = originalSegmentFormat;

    addBlock(group, createParagraph(false /*isImplicit*/, context));
};
