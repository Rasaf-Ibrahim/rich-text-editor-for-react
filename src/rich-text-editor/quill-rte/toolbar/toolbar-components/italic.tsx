/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { FormatItalicRounded } from '../mui/icons';


// mui components
import {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'


// reusable components
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function ITALIC___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🫓 handleItalic
    const handleItalic = () => {
        const isItalic = quillRef.current.getFormat().italic;

        if (isItalic) {
            quillRef.current.format('italic', false);
        } else {
            quillRef.current.format('italic', true);
        }

        update_rte_state(draft => {
            draft.formats_of_selected_text.italic = !draft.formats_of_selected_text.italic
        })
    }


    return (
        <Tooltip title="Italic" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleItalic}>

                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={FormatItalicRounded}
                        condition_to_use_primary_color={rte_state.formats_of_selected_text.italic}
                    />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}