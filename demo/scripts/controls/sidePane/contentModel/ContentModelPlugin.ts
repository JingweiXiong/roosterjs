import ContentModelPane, { ContentModelPaneProps } from './ContentModelPane';
import HackedEditor from '../../hackedEditor/HackedEditor';
import SidePanePluginImpl from '../SidePanePluginImpl';
import { addRangeToSelection } from 'roosterjs-editor-dom';
import { ContentModelDocument } from 'roosterjs-content-model';
import { createRibbonPlugin, RibbonPlugin } from 'roosterjs-react';
import { SidePaneElementProps } from '../SidePaneElement';
import {
    ChangeSource,
    IEditor,
    PluginEvent,
    PluginEventType,
    SelectionRangeTypes,
} from 'roosterjs-editor-types';

export default class ContentModelPlugin extends SidePanePluginImpl<
    ContentModelPane,
    ContentModelPaneProps
> {
    private contentModelRibbon: RibbonPlugin;

    constructor() {
        super(ContentModelPane, 'contentModel', 'Content Model (Under development)');
        this.contentModelRibbon = createRibbonPlugin();
    }

    initialize(editor: IEditor): void {
        super.initialize(editor);

        this.contentModelRibbon.initialize(editor);
        editor.getDocument().addEventListener('selectionchange', this.onModelChange);
    }

    dispose(): void {
        this.contentModelRibbon.dispose();
        this.editor.getDocument().removeEventListener('selectionchange', this.onModelChange);

        super.dispose();
    }

    onPluginEvent(e: PluginEvent) {
        if (
            e.eventType == PluginEventType.Input ||
            (e.eventType == PluginEventType.ContentChanged &&
                (e.source == ChangeSource.SwitchToDarkMode ||
                    e.source == ChangeSource.SwitchToLightMode))
        ) {
            this.onModelChange();
        }

        this.contentModelRibbon.onPluginEvent(e);
    }

    private onGetModel = () => {
        return isHackedEditor(this.editor) ? this.editor.getContentModel() : null;
    };

    protected getComponentProps(baseProps: SidePaneElementProps): ContentModelPaneProps {
        return {
            ...baseProps,
            model: null,
            ribbonPlugin: this.contentModelRibbon,
            onUpdateModel: this.onGetModel,
            onCreateDOM: this.onCreateDOM,
        };
    }

    private onModelChange = () => {
        this.getComponent(component => {
            const model = this.onGetModel();
            component.setContentModel(model);
        });
    };

    private onCreateDOM = (model: ContentModelDocument) => {
        if (isHackedEditor(this.editor)) {
            const [fragment, selection] = this.editor.getDOMFromContentModel(model);
            const win = window.open('about:blank');

            win.document.body.appendChild(fragment);

            if (selection) {
                switch (selection.type) {
                    case SelectionRangeTypes.Normal:
                        addRangeToSelection(selection.ranges[0]);
                        break;

                    case SelectionRangeTypes.TableSelection:
                        // TODO
                        break;
                }
            }
        }
    };
}

function isHackedEditor(editor: IEditor | null): editor is HackedEditor {
    return editor && !!(<HackedEditor>editor).getContentModel;
}
