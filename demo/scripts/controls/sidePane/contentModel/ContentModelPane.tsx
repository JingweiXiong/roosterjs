import * as React from 'react';
import ContentModel from '../../contentModel/components/ContentModel';
import { ContentModelDocument } from 'roosterjs-content-model';
import { exportButton } from './buttons/exportButton';
import { formatTableButton } from './buttons/formatTableButton';
import { insertTableButton } from './buttons/insertTableButton';
import { refreshButton } from './buttons/refreshButton';
import { Ribbon, RibbonButton, RibbonPlugin } from 'roosterjs-react';
import { setTableCellShadeButton } from './buttons/setTableCellShadeButton';
import { SidePaneElementProps } from '../SidePaneElement';

export interface ContentModelPaneState {
    model: ContentModelDocument;
}

export interface ContentModelPaneProps extends ContentModelPaneState, SidePaneElementProps {
    ribbonPlugin: RibbonPlugin;
}

export default class ContentModelPane extends React.Component<
    ContentModelPaneProps,
    ContentModelPaneState
> {
    private contentModelButtons: RibbonButton<any>[];

    constructor(props: ContentModelPaneProps) {
        super(props);

        this.contentModelButtons = [
            refreshButton,
            exportButton,
            insertTableButton,
            formatTableButton,
            setTableCellShadeButton,
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
}
