/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import { FormatStrikethroughRounded } from '../mui/icons';


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function STRIKE_THROUGH___COMPONENT(props:type_of_toolbar_option_component_props) {



    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleStrikeThrough
    const handleStrikeThrough = () => {

        const isStrikeThrough = quillRef.current.getFormat().strike;

        if (isStrikeThrough) {
            quillRef.current.format('strike', false);
        } else {
            quillRef.current.format('strike', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.strike = !draft.formats_of_selected_text.strike
        })
    }


    return (

        <Tooltip title="Strikethrough" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleStrikeThrough}>

                    <FormatStrikethroughRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.strike ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}