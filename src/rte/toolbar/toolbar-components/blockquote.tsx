/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {FormatQuoteRounded} from '../mui/icons'


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function BLOCKQUOTE___COMPONENT(props:type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleBlockQuote
    const handleBlockQuote = () => {

        const isBlockQuote = quillRef.current.getFormat().blockquote

        if (isBlockQuote) {
            quillRef.current.format('blockquote', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.blockquote = false
            })
        }

        else {
            quillRef.current.format('blockquote', true);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.blockquote = true
            })
        }
    }

    return (
        <Tooltip title="Blockquote" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleBlockQuote}>

                    <FormatQuoteRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.blockquote ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}
