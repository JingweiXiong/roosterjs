import * as experimentCommitListChains from 'roosterjs-editor-api/lib/experiment/experimentCommitListChains';
import * as TestHelper from 'roosterjs-editor-api/test/TestHelper';
import { VListChain } from 'roosterjs-editor-dom';
import * as DomTestHelper from 'roosterjs-editor-dom/test/DomTestHelper';
import { ClipboardData, IEditor, Keys, PluginEvent, PluginEventType } from 'roosterjs-editor-types';
import { CutPasteListChain } from '../../lib/CutPasteListChain';

describe('cutPasteListChain tests', () => {
    let editor: IEditor;
    let plugin: CutPasteListChain;
    const TEST_ID = 'cutPasteListChain';

    beforeEach(() => {
        editor = TestHelper.initEditor(TEST_ID);
        spyOn(VListChain, 'createListChains').and.callThrough();
        spyOn(experimentCommitListChains, 'default').and.callThrough();
        plugin = new CutPasteListChain();
        plugin.initialize(editor);
    });

    afterEach(() => {
        editor.dispose();
        plugin.dispose();
        TestHelper.removeElement(TEST_ID);
        document.body = document.createElement('body');
    });

    it('returns the actual plugin name', () => {
        const expectedName = 'CutPasteListChain';
        const pluginName = plugin.getName();
        expect(pluginName).toBe(expectedName);
    });

    function createPluginEventBeforeCutCopy(root: HTMLDivElement) {
        const range = DomTestHelper.createRangeFromChildNodes(root);

        const pluginEvent: PluginEvent = {
            eventType: PluginEventType.BeforeCutCopy,
            rawEvent: <any>{
                which: Keys.NULL,
            },
            clonedRoot: root,
            range,
            isCut: true,
        };
        return pluginEvent;
    }

    function createPluginEventBeforePaste(testString: string) {
        const clipboardData: ClipboardData = {
            types: [],
            text: testString,
            rawHtml: null,
            image: null,
            snapshotBeforePaste: null,
            imageDataUri: null,
            customValues: {},
        };

        const pluginEvent: PluginEvent = {
            eventType: PluginEventType.BeforePaste,
            clipboardData,
            fragment: null,
            sanitizingOption: {
                elementCallbacks: {},
                attributeCallbacks: {},
                cssStyleCallbacks: {},
                additionalTagReplacements: {},
                additionalAllowedAttributes: [],
                additionalAllowedCssClasses: [],
                additionalDefaultStyleValues: {},
                additionalGlobalStyleNodes: [],
                additionalPredefinedCssForElement: {},
                preserveHtmlComments: false,
                unknownTagReplacement: null,
            },
            htmlBefore: null,
            htmlAfter: null,
            htmlAttributes: {},
        };

        return pluginEvent;
    }

    it('caches the list chain with cut', () => {
        const testString: string = 'this is a test';
        const root = (document.getElementById('cutPasteListChain') as HTMLDivElement)!;
        root.innerHTML = testString;

        const expectedText: string = testString;

        const pluginEvent = createPluginEventBeforeCutCopy(root);

        plugin.onPluginEvent(pluginEvent);
        expect(VListChain.createListChains).toHaveBeenCalled();
        expect(root.innerHTML).toBe(expectedText);
    });

    it('caches the list chain with paste', () => {
        const testString: string = 'this is a test';
        const root = (document.getElementById('cutPasteListChain') as HTMLDivElement)!;
        root.innerHTML = testString;
        const expectedText: string = testString;

        const pluginEvent = createPluginEventBeforePaste(testString);

        plugin.onPluginEvent(pluginEvent);
        expect(VListChain.createListChains).toHaveBeenCalled();
        expect(root.innerHTML).toBe(expectedText);
    });

    it('not call experimentCommitListChains with ContentChanged', () => {
        const testString: string = 'this is a test';

        const pasteEvent = createPluginEventBeforePaste(testString);
        plugin.onPluginEvent(pasteEvent);

        const contentChangedEvent: PluginEvent = {
            eventType: PluginEventType.ContentChanged,
            source: 'Paste',
        };
        plugin.onPluginEvent(contentChangedEvent);

        expect(experimentCommitListChains.default).not.toHaveBeenCalled();
    });
});
