import * as React from 'react';
import { FormatRenderer } from './utils/FormatRenderer';

export function FormatView<T>(props: { format: T; renderers: FormatRenderer<T>[] }) {
    const { format, renderers } = props;

    return <table>{renderers.map(x => x(format))}</table>;
}
