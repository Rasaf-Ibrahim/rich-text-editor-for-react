/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { FormatBoldRounded } from '../../../../dependencies/mui/icons'


// mui components
import {
    IconButton,
    FormControl,
    Tooltip
} from '../../../../dependencies/mui/components'


// reusable components
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function BOLD___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🍪 handleBold
    const handleBold = () => {

        const isBold = quillRef.current.getFormat().bold;

        if (isBold) {
            quillRef.current.format('bold', false);
        } else {
            quillRef.current.format('bold', true);
        }

        update_rte_state(draft => {
            draft.formats_of_selected_text.bold = !draft.formats_of_selected_text.bold
        })
    }


    // ✅ JSX
    return (
        <Tooltip title="Bold" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handleBold} size='small'>

                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={FormatBoldRounded}
                        condition_to_use_primary_color={rte_state.formats_of_selected_text.bold}

                    />

                </IconButton>
            </FormControl>
        </Tooltip>
    )
}
