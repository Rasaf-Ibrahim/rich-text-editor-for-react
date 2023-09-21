/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'


// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import {
    SubscriptRounded
} from '../../../../dependencies/mui/icons'


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

export default function SUB_SCRIPT___COMPONENT(props: type_of_toolbar_option_component_props) {

    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🍪 handleSubScript
    const handleSubScript = () => {

        const isSubScript = quillRef.current.getFormat().script === 'sub'

        if (isSubScript) {
            quillRef.current.format('script', false);

            update_rte_state(draft => {
                draft.formats_of_selected_text.script = false
            })

        } else {
            quillRef.current.format('script', 'sub');

            update_rte_state(draft => {
                draft.formats_of_selected_text.script = 'sub'
            })
        }

    }


    return (

        <Tooltip title="SubScript" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleSubScript} size='small'>

                    <MUI_ICON___REUSABLE

                        ICON_COMPONENT={SubscriptRounded}
                        condition_to_use_primary_color={rte_state.formats_of_selected_text.script === 'sub'}

                    />


                </IconButton>

            </FormControl>

        </Tooltip>
    )
}

