import RibbonButton from '../../type/RibbonButton';
import { renderColorPicker } from '../../../colorPicker/component/renderColorPicker';
import { setTextColor } from 'roosterjs-editor-api';
import { TextColorButtonStringKey } from '../../type/RibbonButtonStringKeys';
import { TextColorDropDownItems, TextColors } from '../../../colorPicker/utils/textColors';
import {
    getColorPickerContainerClassName,
    getColorPickerItemClassName,
} from '../../../colorPicker/utils/getClassNamesForColorPicker';

/**
 * @internal
 * "Text color" button on the format ribbon
 */
export const textColor: RibbonButton<TextColorButtonStringKey> = {
    dropDownMenu: {
        items: TextColorDropDownItems,
        itemClassName: getColorPickerItemClassName(),
        allowLivePreview: true,
        itemRender: (item, onClick) => renderColorPicker(item, TextColors, onClick),
        commandBarSubMenuProperties: {
            className: getColorPickerContainerClassName(),
        },
    },
    key: 'buttonNameTextColor',
    unlocalizedText: 'Text color',
    iconName: 'FontColor',
    onClick: (editor, key) => {
        // This should be always true. Add this value just to satisfy compiler
        if (key != 'buttonNameTextColor') {
            const color = TextColors[key];
            setTextColor(editor, color);
        }
    },
};
