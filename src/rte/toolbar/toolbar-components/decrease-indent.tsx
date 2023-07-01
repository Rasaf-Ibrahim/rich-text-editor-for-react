/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {
    FormatIndentDecreaseRounded,
    FormatIndentIncreaseRounded,
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

export default function DECREASE_INDENT___COMPONENT (props:type_of_toolbar_option_component_props) {

    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleIndent
    const handleIndent = () => {

        let indent = quillRef.current.getFormat().indent;

        let current_indent = typeof indent === 'undefined' ? 0 : indent

        let new_indent

        if (current_indent === 0) {
            new_indent = current_indent
        }
        else {
            new_indent = current_indent - 1
        }


        quillRef.current.format('indent', new_indent);

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.indent = new_indent;
        })
    }



    return (

        <Tooltip title="Decrease Indent" placement="top">

            <FormControl margin="dense">

                <IconButton onClick={handleIndent}>

                    {/* 🔖 Why are we not changing color of the indent icon?

                        - increase indent or decrease indent icon doesn't need to have a separate color when the selected text is indented

                        - it's not like bold that a text is already bold and we can click on the bold button again to unbold it.
                        
                        - indent isn't a boolean value, it's a number and it can get increased or decreased. And there is also two separate icon for increasing and decreasing.
                        
                        - So, when a selected text has a indent of more than 0, both increase and decrease indent icon can be used to change the current indent. So, it doesn't make to highlight one of them or both of them with a different color. 
                    */}

                    {/* Decrease Indent's icon is depending on the direction state, if the direction is 'rtl', the icon must be different. */}

                    {wysiwyg_state.formats_of_selected_text.direction === 'rtl' ?

                        /* this icon will be used only when the direction is 'rtl' (for example while writing arabic)*/
                        <FormatIndentIncreaseRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />

                        :

                        /* normally, this icon will be used */
                        <FormatIndentDecreaseRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />

                    }

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}