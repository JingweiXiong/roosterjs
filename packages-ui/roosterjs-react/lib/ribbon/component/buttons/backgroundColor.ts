import RibbonButton from '../../type/RibbonButton';
import { BackgroundColorButtonStringKey } from '../../type/RibbonButtonStringKeys';
import { renderColorPicker } from '../../../colorPicker/component/renderColorPicker';
import { setBackgroundColor } from 'roosterjs-editor-api';
import {
    getColorPickerContainerClassName,
    getColorPickerItemClassName,
} from '../../../colorPicker/utils/getClassNamesForColorPicker';
import {
    BackgroundColorDropDownItems,
    BackgroundColors,
} from '../../../colorPicker/utils/backgroundColors';

/**
 * @internal
 * "Background color" button on the format ribbon
 */
export const backgroundColor: RibbonButton<BackgroundColorButtonStringKey> = {
    dropDownMenu: {
        items: BackgroundColorDropDownItems,
        itemClassName: getColorPickerItemClassName(),
        allowLivePreview: true,
        itemRender: (item, onClick) => renderColorPicker(item, BackgroundColors, onClick),
        commandBarSubMenuProperties: {
            className: getColorPickerContainerClassName(),
        },
    },
    key: 'buttonNameBackgroundColor',
    unlocalizedText: 'Background color',
    iconName: 'FabricTextHighlight',
    onClick: (editor, key) => {
        // This should be always true. Add this value just to satisfy compiler
        if (key != 'buttonNameBackgroundColor') {
            const color = BackgroundColors[key];
            setBackgroundColor(editor, color);
        }
    },
};
