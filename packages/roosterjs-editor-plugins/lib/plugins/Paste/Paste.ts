import convertPasteContentForSingleImage from './imageConverter/convertPasteContentForSingleImage';
import convertPastedContentForLI from './commonConverter/convertPastedContentForLI';
import convertPastedContentFromExcel from './excelConverter/convertPastedContentFromExcel';
import convertPastedContentFromPowerPoint from './pptConverter/convertPastedContentFromPowerPoint';
import convertPastedContentFromWord from './wordConverter/convertPastedContentFromWord';
import handleLineMerge from './lineMerge/handleLineMerge';
import sanitizeHtmlColorsFromPastedContent from './sanitizeHtmlColorsFromPastedContent/sanitizeHtmlColorsFromPastedContent';
import { safeInstanceOf, toArray } from 'roosterjs-editor-dom';
import {
    ClipboardData,
    EditorPlugin,
    ExperimentalFeatures,
    IEditor,
    PluginEvent,
    PluginEventType,
} from 'roosterjs-editor-types';
import convertPastedContentFromWordOnline, {
    isWordOnlineWithList,
} from './officeOnlineConverter/convertPastedContentFromWordOnline';

const WORD_ATTRIBUTE_NAME = 'xmlns:w';
const WORD_ATTRIBUTE_VALUE = 'urn:schemas-microsoft-com:office:word';
const WORD_PROG_ID = 'Word.Document';
const EXCEL_ATTRIBUTE_NAME = 'xmlns:x';
const EXCEL_ATTRIBUTE_VALUE = 'urn:schemas-microsoft-com:office:excel';
const PROG_ID_NAME = 'ProgId';
const EXCEL_ONLINE_ATTRIBUTE_VALUE = 'Excel.Sheet';
const POWERPOINT_ATTRIBUTE_VALUE = 'PowerPoint.Slide';
const GOOGLE_SHEET_NODE_NAME = 'google-sheets-html-origin';
const WAC_IDENTIFY_SELECTOR =
    'ul[class^="BulletListStyle"]>.OutlineElement,ol[class^="NumberListStyle"]>.OutlineElement,span.WACImageContainer';
const INVALID_PASTED_URLS_REGEX = /^blob:|^webkit-fake-url:|^file:|^data:/i;

/**
 * Paste plugin, handles BeforePaste event and reformat some special content, including:
 * 1. Content copied from Word
 * 2. Content copied from Excel
 * 3. Content copied from Word Online or OneNote Online
 */
export default class Paste implements EditorPlugin {
    private editor: IEditor;
    private invalidSingleImageUrls?: RegExp[];
    /**
     * Construct a new instance of Paste class
     * @param unknownTagReplacement Replace solution of unknown tags, default behavior is to replace with SPAN
     * @param invalidSingleImageUrls Invalid Image Sources to convert to single image
     */
    constructor(private unknownTagReplacement: string = 'SPAN', invalidSingleImageUrls?: RegExp[]) {
        this.invalidSingleImageUrls = [INVALID_PASTED_URLS_REGEX, ...invalidSingleImageUrls];
    }

    /**
     * Get a friendly name of  this plugin
     */
    getName() {
        return 'Paste';
    }

    /**
     * Initialize this plugin. This should only be called from Editor
     * @param editor Editor instance
     */
    initialize(editor: IEditor) {
        this.editor = editor;
    }

    /**
     * Dispose this plugin
     */
    dispose() {
        this.editor = null;
    }

    /**
     * Handle events triggered from editor
     * @param event PluginEvent object
     */
    onPluginEvent(event: PluginEvent) {
        if (event.eventType == PluginEventType.BeforePaste) {
            const { htmlAttributes, fragment, sanitizingOption, clipboardData } = event;
            const trustedHTMLHandler = this.editor.getTrustedHTMLHandler();
            let wacListElements: Node[];

            if (isWordDocument(htmlAttributes)) {
                // Handle HTML copied from Word
                convertPastedContentFromWord(event);
            } else if (
                htmlAttributes[EXCEL_ATTRIBUTE_NAME] == EXCEL_ATTRIBUTE_VALUE ||
                htmlAttributes[PROG_ID_NAME] == EXCEL_ONLINE_ATTRIBUTE_VALUE
            ) {
                // Handle HTML copied from Excel
                convertPastedContentFromExcel(event, trustedHTMLHandler);
            } else if (htmlAttributes[PROG_ID_NAME] == POWERPOINT_ATTRIBUTE_VALUE) {
                convertPastedContentFromPowerPoint(event, trustedHTMLHandler);
            } else if (
                (wacListElements = toArray(fragment.querySelectorAll(WAC_IDENTIFY_SELECTOR))) &&
                wacListElements.length > 0
            ) {
                // Once it is known that the document is from WAC
                // We need to remove the display property and margin from all the list item
                wacListElements.forEach((el: HTMLElement) => {
                    el.style.display = null;
                    el.style.margin = null;
                });
                // call conversion function if the pasted content is from word online and
                // has list element in the pasted content.
                if (isWordOnlineWithList(fragment)) {
                    convertPastedContentFromWordOnline(fragment);
                }
            } else if (fragment.querySelector(GOOGLE_SHEET_NODE_NAME)) {
                sanitizingOption.additionalTagReplacements[GOOGLE_SHEET_NODE_NAME] = '*';
            } else if (
                this.editor.isFeatureEnabled(ExperimentalFeatures.ConvertSingleImageBody) &&
                isValidSingleImageToConvert(clipboardData, fragment, this.invalidSingleImageUrls)
            ) {
                convertPasteContentForSingleImage(event, trustedHTMLHandler);
            } else {
                convertPastedContentForLI(fragment);
                handleLineMerge(fragment);
            }

            sanitizeHtmlColorsFromPastedContent(sanitizingOption);

            // Replace unknown tags with SPAN
            sanitizingOption.unknownTagReplacement = this.unknownTagReplacement;
        }
    }
}

function isWordDocument(htmlAttributes: Record<string, string>) {
    return (
        htmlAttributes[WORD_ATTRIBUTE_NAME] == WORD_ATTRIBUTE_VALUE ||
        htmlAttributes[PROG_ID_NAME] == WORD_PROG_ID
    );
}

function isValidSingleImageToConvert(
    clipboardData: ClipboardData,
    fragment: DocumentFragment,
    invalidImgSrcs: RegExp[]
) {
    const { htmlFirstLevelChildTags } = clipboardData;
    const { firstChild } = fragment;

    if (
        htmlFirstLevelChildTags?.length == 1 &&
        htmlFirstLevelChildTags[0] == 'IMG' &&
        safeInstanceOf(firstChild, 'HTMLImageElement')
    ) {
        for (const invalidImgSrc of invalidImgSrcs) {
            if (invalidImgSrc.test(firstChild.src)) {
                return false;
            }
        }
        return true;
    }
    return false;
}
