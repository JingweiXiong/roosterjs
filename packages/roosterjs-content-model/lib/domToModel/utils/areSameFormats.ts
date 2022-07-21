import { ContentModelSegmentFormat } from '../../publicTypes/format/ContentModelSegmentFormat';

const DummySegmentFormat: Required<ContentModelSegmentFormat> = {
    bold: false,
    italic: false,
    underline: false,
    subscript: false,
    superscript: false,
    strikethrough: false,
    fontFamily: '',
    fontSize: '',
    textColor: '',
    backgroundColor: '',
    linkHref: '',
    linkTarget: '',
};

const SegmentFormatKeys = Object.keys(DummySegmentFormat) as (keyof ContentModelSegmentFormat)[];

/**
 * @internal
 */
export function areSameFormats(f1: ContentModelSegmentFormat, f2: ContentModelSegmentFormat) {
    return SegmentFormatKeys.every(k => f1[k] === f2[k]);
}
