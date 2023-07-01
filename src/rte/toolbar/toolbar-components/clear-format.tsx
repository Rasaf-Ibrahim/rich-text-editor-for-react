
/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// hook
import { useUpdateEffect } from "react-use";
import { useImmer } from "use-immer";


// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';



// icons
import { FormatClearRounded } from "../mui/icons";


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'







/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function CLEAR_FORMAT___COMPONENT(props:type_of_toolbar_option_component_props){


    // 🥪 props
    const { quillRef, wysiwyg_initial_state, wysiwyg_state, update_wysiwyg_state } = props



    /* 🔖 Why do I need the following state?
    
     Suppose, I have selected a text. If the selected text is bolded, the bold button will normally have a different color to indicate the selected text is bolded.

     But what if after selecting the bold text, instead of clicking the bold button to unbold it, I click on the remove format button to remove the bold formatting. The text will no longer have bold format but the bold button will still have the color which indicates that the text is bolded until we remove our cursor or selection.


     To fix this issue, we are having the following state. We will trigger the following state after removing format of the selected text.

     The state change will trigger a useUpdateEffect, where I am getting the format of the selected text after removing its format, then we are updating 'wysiwyg_state.formats_of_selected_text'  state so that all the toolbar options' buttons reflects true state of the selected text.
    
    */


    const [remove_format_state, update_remove_format_state] = useImmer({
        trigger_format_checking: false
    })



    const handle_clear_format = () => {

        const range = quillRef.current.getSelection();
        if (range) {
            quillRef.current.removeFormat(range.index, range.length);
        }


        update_remove_format_state(draft => {
            draft.trigger_format_checking = !draft.trigger_format_checking
        })
    }




    /* Updating the wysiwyg_state.formats_of_selected_text */
    useUpdateEffect(() => {

        // getting the format after using removeFormat
        const format = quillRef.current.getFormat(wysiwyg_state.editor_cursor.position, wysiwyg_state.editor_cursor.selection_length)

        // updating
        update_wysiwyg_state(draft => {

            draft.formats_of_selected_text = { ...wysiwyg_initial_state.formats_of_selected_text, ...format }
        })


    }, [remove_format_state.trigger_format_checking]);



    return (
        <Tooltip title="Clear Format" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handle_clear_format}>
                    <FormatClearRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                    })} />
                </IconButton>
            </FormControl>
        </Tooltip>
    )
}


