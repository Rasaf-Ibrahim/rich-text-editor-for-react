/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {FormatBoldRounded} from '../mui/icons'


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function BOLD___COMPONENT (props:type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleBold
    const handleBold = () => {

        const isBold = quillRef.current.getFormat().bold;

        if (isBold) {
            quillRef.current.format('bold', false);
        } else {
            quillRef.current.format('bold', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.bold = !draft.formats_of_selected_text.bold
        })
    }


    // ✅ JSX
    return (
        <Tooltip title="Bold" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handleBold}>
                    <FormatBoldRounded sx={(theme) => ({

                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.bold ? theme.palette.primary.dark : theme.palette.text.primary

                    })} />
                </IconButton>
            </FormControl>
        </Tooltip>
    )
}
