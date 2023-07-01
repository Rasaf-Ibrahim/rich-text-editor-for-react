/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {
    SubscriptRounded,
    SuperscriptRounded
} from '../mui/icons'


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function SUB_SCRIPT___COMPONENT(props: type_of_toolbar_option_component_props){

    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleSubScript
    const handleSubScript = () => {

        const isSubScript = quillRef.current.getFormat().script === 'sub'

        if (isSubScript) {
            quillRef.current.format('script', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = false
            })

        } else {
            quillRef.current.format('script', 'sub');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = 'sub'
            })
        }

    }


    return (

        <Tooltip title="SubScript" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleSubScript}>

                    <SubscriptRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.script === 'sub' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}

