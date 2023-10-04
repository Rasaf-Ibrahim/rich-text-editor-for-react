
/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'


// nanoid
import { nanoid } from 'nanoid'


// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library'


// hook
import { useState, useEffect } from 'react'


// icons
import { FormatClearRounded } from "../../../../dependencies/mui/icons"


// mui components
import {
    IconButton,
    FormControl,
    Tooltip
} from '../../../../dependencies/mui/components'


// reusable components
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon'





/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function CLEAR_FORMAT___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🍪 props
    const { quillRef, rte_initial_state, rte_state, update_rte_state } = props



    /* 🔖 Why do I need the following state?
    
     Suppose, I have selected a text. If the selected text is bolded, the bold button will normally have a different color to indicate the selected text is bolded.

     But what if after selecting the bold text, instead of clicking the bold button to unbold it, I click on the remove format button to remove the bold formatting. The text will no longer have bold format but the bold button will still have the color which indicates that the text is bolded until we remove our cursor or selection.


     To fix this issue, we are having the following state. We will trigger the following state after removing format of the selected text.

     The state change will trigger a effect, where I am getting the format of the selected text after removing its format, then we are updating 'rte_state.formats_of_selected_text'  state so that all the toolbar options' buttons reflects true state of the selected text.
    
    */

    const [trigger_format_checking, set_trigger_format_checking] = useState('')



    const handle_clear_format = () => {

        const range = quillRef.current.getSelection();
        if (range) {
            quillRef.current.removeFormat(range.index, range.length);
        }


        set_trigger_format_checking(nanoid(8))
    }



    /* Updating the rte_state.formats_of_selected_text */
    useEffect(() => {

        if(trigger_format_checking === '') return


        // getting the format after using removeFormat
        const format = quillRef.current.getFormat(rte_state.editor_cursor.position, rte_state.editor_cursor.selection_length)

        // updating
        update_rte_state(draft => {

            draft.formats_of_selected_text = { ...rte_initial_state.formats_of_selected_text, ...format }
        })


    }, [trigger_format_checking])



    // TSX
    return (

        <Tooltip title="Clear Format" placement="top">
            <FormControl margin='dense'>


                <IconButton onClick={handle_clear_format} size='small'>
                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={FormatClearRounded}
                    />
                </IconButton>

            </FormControl>
        </Tooltip>
    )
}


