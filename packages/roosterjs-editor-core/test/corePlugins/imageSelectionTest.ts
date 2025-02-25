import Editor from '../../lib/editor/Editor';
import ImageSelection from '../../lib/corePlugins/ImageSelection';
import {
    IEditor,
    EditorOptions,
    SelectionRangeTypes,
    PluginEvent,
    PluginEventType,
} from 'roosterjs-editor-types';
export * from 'roosterjs-editor-dom/test/DomTestHelper';

const Escape = 'Escape';
const Space = ' ';

describe('ImageSelectionPlugin |', () => {
    let editor: IEditor;
    let id = 'imageSelectionContainerId';
    let imageId = 'imageSelectionId';
    let imageSelection: ImageSelection;
    let editorIsFeatureEnabled: any;

    beforeEach(() => {
        let node = document.createElement('div');
        node.id = id;
        document.body.insertBefore(node, document.body.childNodes[0]);
        imageSelection = new ImageSelection();

        let options: EditorOptions = {
            plugins: [imageSelection],
            defaultFormat: {
                fontFamily: 'Calibri,Arial,Helvetica,sans-serif',
                fontSize: '11pt',
                textColor: '#000000',
            },
            corePluginOverride: {},
        };

        editor = new Editor(node as HTMLDivElement, options);

        editor.runAsync = callback => {
            callback(editor);
            return null;
        };
        editorIsFeatureEnabled = spyOn(editor, 'isFeatureEnabled');
    });

    afterEach(() => {
        editor.dispose();
        editor = null;
        const div = document.getElementById(id);
        div.parentNode.removeChild(div);
    });

    it('should be triggered in mouse up left click', () => {
        editor.setContent(`<img id=${imageId}></img>`);
        const target = document.getElementById(imageId);
        editorIsFeatureEnabled.and.returnValue(true);
        simulateMouseEvent('mousedown', target!, 0);
        simulateMouseEvent('mouseup', target!, 0);
        editor.focus();

        const selection = editor.getSelectionRangeEx();
        expect(selection.type).toBe(SelectionRangeTypes.ImageSelection);
        expect(selection.areAllCollapsed).toBe(false);
    });

    it('should be triggered in mouse up right click', () => {
        editor.setContent(`<img id=${imageId}></img>`);
        const target = document.getElementById(imageId);
        editorIsFeatureEnabled.and.returnValue(true);
        simulateMouseEvent('mousedown', target!, 2);
        simulateMouseEvent('mouseup', target!, 2);
        editor.focus();

        const selection = editor.getSelectionRangeEx();
        expect(selection.type).toBe(SelectionRangeTypes.Normal);
        expect(selection.areAllCollapsed).toBe(false);
    });

    it('should be triggered in shadow Edit', () => {
        editor.setContent(`<img id=${imageId}></img>`);
        const target = document.getElementById(imageId);
        editorIsFeatureEnabled.and.returnValue(true);
        editor.focus();
        editor.select(target);

        editor.startShadowEdit();

        let selection = editor.getSelectionRangeEx();
        expect(selection.type).toBe(SelectionRangeTypes.ImageSelection);
        expect(selection.areAllCollapsed).toBe(false);

        editor.stopShadowEdit();

        selection = editor.getSelectionRangeEx();
        expect(selection.type).toBe(SelectionRangeTypes.ImageSelection);
        expect(selection.areAllCollapsed).toBe(false);
    });

    it('should handle a ESCAPE KEY in a image', () => {
        editor.setContent(`<img id=${imageId}></img>`);
        const target = document.getElementById(imageId);
        editorIsFeatureEnabled.and.returnValue(true);
        editor.focus();
        editor.select(target);
        const range = document.createRange();
        range.selectNode(target!);
        imageSelection.onPluginEvent(keyDown(Escape));
        imageSelection.onPluginEvent(keyUp(Escape));
        const selection = editor.getSelectionRangeEx();
        expect(selection.type).toBe(SelectionRangeTypes.Normal);
        expect(selection.areAllCollapsed).toBe(true);
    });

    it('should handle any key in a image', () => {
        editor.setContent(`<img id=${imageId}></img>`);
        const target = document.getElementById(imageId);
        editorIsFeatureEnabled.and.returnValue(true);
        editor.focus();
        editor.select(target);
        const range = document.createRange();
        range.selectNode(target!);
        imageSelection.onPluginEvent(keyDown(Space));
        imageSelection.onPluginEvent(keyUp(Space));
        const selection = editor.getSelectionRangeEx();
        expect(selection.type).toBe(SelectionRangeTypes.Normal);
        expect(selection.areAllCollapsed).toBe(false);
    });

    const keyDown = (key: string): PluginEvent => {
        return {
            eventType: PluginEventType.KeyDown,
            rawEvent: <KeyboardEvent>{
                key: key,
                preventDefault: () => {},
                stopPropagation: () => {},
            },
        };
    };

    const keyUp = (key: string): PluginEvent => {
        return {
            eventType: PluginEventType.KeyUp,
            rawEvent: <KeyboardEvent>{
                key: key,
                preventDefault: () => {},
                stopPropagation: () => {},
            },
        };
    };

    function simulateMouseEvent(mouseEvent: string, target: HTMLElement, keyNumber: number) {
        const rect = target.getBoundingClientRect();
        var event = new MouseEvent(mouseEvent, {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: rect.left,
            clientY: rect.top,
            shiftKey: false,
            button: keyNumber,
        });
        target.dispatchEvent(event);
    }
});
