/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import {
    SuperscriptRounded
} from '../mui/icons'


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

export default function SUPER_SCRIPT___COMPONENT(props: type_of_toolbar_option_component_props) {

    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🍪 handleSuperScript
    const handleSuperScript = () => {

        const isSuperScript = quillRef.current.getFormat().script === 'super'

        if (isSuperScript) {
            quillRef.current.format('script', false);

            update_rte_state(draft => {
                draft.formats_of_selected_text.script = false
            })

        } else {
            quillRef.current.format('script', 'super');

            update_rte_state(draft => {
                draft.formats_of_selected_text.script = 'super'
            })
        }

    }


    return (

        <Tooltip title="SuperScript" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleSuperScript} size='small'>

                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={SuperscriptRounded}

                        condition_to_use_primary_color={rte_state.formats_of_selected_text.script === 'super'}
                    />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}