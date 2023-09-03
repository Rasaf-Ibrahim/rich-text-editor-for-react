/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { FormatUnderlinedRounded } from '../mui/icons';


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

export default function UNDERLINE___COMPONENT(props: type_of_toolbar_option_component_props) {



    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🫓 handleUnderline
    const handleUnderline = () => {
        const isUnderline = quillRef.current.getFormat().underline;

        if (isUnderline) {
            quillRef.current.format('underline', false);
        } else {
            quillRef.current.format('underline', true);
        }

        update_rte_state(draft => {
            draft.formats_of_selected_text.underline = !draft.formats_of_selected_text.underline
        })
    }


    return (

        <Tooltip title="Underline" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleUnderline}>

                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={FormatUnderlinedRounded}
                        condition_to_use_primary_color={rte_state.formats_of_selected_text.underline}
                    />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}