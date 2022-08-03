import * as React from 'react';
import { BackgroundColorFormatRenderer } from './formatPart/BackgroundColorFormatRenderer';
import {
    BoldFormatRenderer,
    ItalicFormatRenderer,
    StrikeFormatRenderer,
    SuperOrSubScriptFormatRenderers,
    UnderlineFormatRenderer,
} from './formatPart/BasicFormatRenderers';
import { ContentModelSegmentFormat } from 'roosterjs-content-model';
import { FontFamilyFormatRenderer } from './formatPart/FontFamilyFormatRenderer';
import { FontSizeFormatRenderer } from './formatPart/FontSizeFormatRenderer';
import { FormatRenderer } from './utils/FormatRenderer';
import { FormatView } from './FormatView';
import { HyperLinkFormatRenderers } from './formatPart/HyperLinkFormatRenderers';
import { TextColorFormatRenderer } from './formatPart/TextColorFormatRenderer';

const SegmentFormatRenders: FormatRenderer<ContentModelSegmentFormat>[] = [
    TextColorFormatRenderer,
    BackgroundColorFormatRenderer,
    FontSizeFormatRenderer,
    FontFamilyFormatRenderer,
    BoldFormatRenderer,
    ItalicFormatRenderer,
    UnderlineFormatRenderer,
    StrikeFormatRenderer,
    ...SuperOrSubScriptFormatRenderers,
    ...HyperLinkFormatRenderers,
];

export function SegmentFormatView(props: { format: ContentModelSegmentFormat }) {
    const { format } = props;
    return <FormatView format={format} renderers={SegmentFormatRenders} />;
}
