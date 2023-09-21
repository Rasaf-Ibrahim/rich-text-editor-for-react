/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'


// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library'


// icons
import { FormatStrikethroughRounded } from '../../../../dependencies/mui/icons';


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

export default function STRIKE_THROUGH___COMPONENT(props: type_of_toolbar_option_component_props) {



    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🍪 handleStrikeThrough
    const handleStrikeThrough = () => {

        const isStrikeThrough = quillRef.current.getFormat().strike;

        if (isStrikeThrough) {
            quillRef.current.format('strike', false);
        } else {
            quillRef.current.format('strike', true);
        }

        update_rte_state(draft => {
            draft.formats_of_selected_text.strike = !draft.formats_of_selected_text.strike
        })
    }


    return (

        <Tooltip title="Strikethrough" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleStrikeThrough} size='small'>

                    <MUI_ICON___REUSABLE

                        ICON_COMPONENT={FormatStrikethroughRounded}
                        condition_to_use_primary_color={rte_state.formats_of_selected_text.strike}

                    />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}