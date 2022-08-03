import { createTextFormatRenderer } from '../utils/createTextFormatRenderer';
import { Definition } from 'roosterjs-editor-types';
import { FormatRenderer } from '../utils/FormatRenderer';
import { MetadataFormat } from 'roosterjs-content-model';
import { validate } from 'roosterjs-editor-dom';

export function createMetadataFormatRenderer<T>(
    def: Definition<T> | null
): FormatRenderer<MetadataFormat<T>> {
    return createTextFormatRenderer<MetadataFormat<T>>(
        'Metadata',
        format => JSON.stringify(format.metadata, null, 2),
        (format, value) => {
            const metadata = JSON.parse(value);
            if (validate(metadata, def)) {
                format.metadata = metadata;
            }
        },
        'multiline'
    );
}
