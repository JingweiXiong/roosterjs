import * as React from 'react';
import ContentModel from '../../contentModel/components/ContentModel';
import { ContentModelDocument } from 'roosterjs-content-model';
import { SidePaneElementProps } from '../SidePaneElement';

export interface ContentModelPaneState {
    model: ContentModelDocument;
}

export interface ContentModelPaneProps extends ContentModelPaneState, SidePaneElementProps {
    onUpdateModel: () => ContentModelDocument;
    onCreateDOM: (model: ContentModelDocument) => void;
}

export default class ContentModelPane extends React.Component<
    ContentModelPaneProps,
    ContentModelPaneState
> {
    constructor(props: ContentModelPaneProps) {
        super(props);

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
        return this.state.model ? (
            <>
                <div>
                    <button onClick={this.onRefresh}>Refresh Content Model</button>&nbsp;
                    <button onClick={this.onCreateDOM}>Create DOM tree</button>
                </div>
                <ContentModel model={this.state.model} isExpanded={true} />
            </>
        ) : null;
    }

    private onCreateDOM = () => {
        this.props.onCreateDOM(this.state.model);
    };

    private onRefresh = () => {
        const model = this.props.onUpdateModel();
        this.setContentModel(model);
    };
}
