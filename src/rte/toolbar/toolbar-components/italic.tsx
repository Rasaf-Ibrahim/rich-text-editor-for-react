/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import { FormatItalicRounded } from '../mui/icons';


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function ITALIC___COMPONENT(props:type_of_toolbar_option_component_props){


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleItalic
    const handleItalic = () => {
        const isItalic = quillRef.current.getFormat().italic;

        if (isItalic) {
            quillRef.current.format('italic', false);
        } else {
            quillRef.current.format('italic', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.italic = !draft.formats_of_selected_text.italic
        })
    }


    return (
        <Tooltip title="Italic" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleItalic}>

                    <FormatItalicRounded sx={(theme) => ({

                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.italic ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />
                </IconButton>

            </FormControl>

        </Tooltip>
    )
}