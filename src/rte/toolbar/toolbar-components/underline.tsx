/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import { FormatUnderlinedRounded } from '../mui/icons';


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function UNDERLINE___COMPONENT (props:type_of_toolbar_option_component_props) {



    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleUnderline
    const handleUnderline = () => {
        const isUnderline = quillRef.current.getFormat().underline;

        if (isUnderline) {
            quillRef.current.format('underline', false);
        } else {
            quillRef.current.format('underline', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.underline = !draft.formats_of_selected_text.underline
        })
    }


    return (

        <Tooltip title="Underline" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleUnderline}>

                    <FormatUnderlinedRounded sx={(theme) => ({

                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.underline ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}