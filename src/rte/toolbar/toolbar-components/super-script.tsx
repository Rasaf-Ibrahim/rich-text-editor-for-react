/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {
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

export default function SUPER_SCRIPT___COMPONENT (props: type_of_toolbar_option_component_props){

    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleSuperScript
    const handleSuperScript = () => {

        const isSuperScript = quillRef.current.getFormat().script === 'super'

        if (isSuperScript) {
            quillRef.current.format('script', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = false
            })

        } else {
            quillRef.current.format('script', 'super');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = 'super'
            })
        }

    }


    return (

        <Tooltip title="SuperScript" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleSuperScript}>

                    <SuperscriptRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.script === 'super' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}