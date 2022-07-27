import * as React from 'react';
import ContentModel from '../../contentModel/components/ContentModel';
import { ContentModelDocument } from 'roosterjs-content-model';
import { getExportButton } from './buttons/export';
import { getRefreshButton } from './buttons/refresh';
import { insertTable } from './buttons/insertTable';
import { InsertTableButtonStringKey, Ribbon, RibbonButton, RibbonPlugin } from 'roosterjs-react';
import { SidePaneElementProps } from '../SidePaneElement';

export interface ContentModelPaneState {
    model: ContentModelDocument;
}

export interface ContentModelPaneProps extends ContentModelPaneState, SidePaneElementProps {
    onUpdateModel: () => ContentModelDocument;
    onCreateDOM: (model: ContentModelDocument) => void;
    ribbonPlugin: RibbonPlugin;
}

export default class ContentModelPane extends React.Component<
    ContentModelPaneProps,
    ContentModelPaneState
> {
    private contentModelButtons: RibbonButton<
        InsertTableButtonStringKey | 'buttonNameRefresh' | 'buttonNameExport'
    >[];

    constructor(props: ContentModelPaneProps) {
        super(props);

        this.contentModelButtons = [
            getRefreshButton(this.onRefresh),
            getExportButton(this.onCreateDOM),
            insertTable,
        ];

        this.state = {
            model: null,
        };
    }

    setContentModel(model: ContentModelDocument) {
        this.setState({
            model: model,
        });
    }

    render() {
        return (
            <>
                <Ribbon buttons={this.contentModelButtons} plugin={this.props.ribbonPlugin} />
                {this.state.model ? (
                    <ContentModel model={this.state.model} isExpanded={true} />
                ) : null}
            </>
        );
    }

    private onCreateDOM = () => {
        this.props.onCreateDOM(this.state.model);
    };

    private onRefresh = () => {
        const model = this.props.onUpdateModel();
        this.setContentModel(model);
    };
}
