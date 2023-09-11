/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import {
    FormatIndentDecreaseRounded,
    FormatIndentIncreaseRounded,
} from '../mui/icons'

// mui components
import {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'


// reusable components
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';




/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function INCREASE_INDENT___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🫓 handleIndent
    const handleIndent = () => {

        let indent = quillRef.current.getFormat().indent;

        let current_indent = typeof indent === 'undefined' ? 0 : indent

        let new_indent

        // setting 7 to be the maximum level of indent
        if (current_indent === 7) {
            new_indent = current_indent
        }
        else {
            new_indent = current_indent + 1
        }

        quillRef.current.format('indent', new_indent);


        update_rte_state(draft => {
            draft.formats_of_selected_text.indent = new_indent

            /*🔖 
                - Whenever we increase or decrease indent, the cursor position gets increased by 1, indentation is one kind of alignment, so I don't the reason why quill increases the cursor position by 1. 

                - Just after indentation, without moving the cursor, if a user tries to align 'right', 'left' or 'center', alignment will not work. Because the cursor position is wrong as quill has increased by 1.

                - To solve this issue, we are decreasing the cursor position value by 1.
                
            */
            draft.editor_cursor.position = draft.editor_cursor.position - 1
        })
    }



    return (
        /* Normally, it's a increase indent but when the direction is 'rtl', it will be a decrease indent. */
        <Tooltip title='Increase Indent' placement="top">

            <FormControl margin="dense">

                <IconButton onClick={handleIndent} size='small'>

                    {/* 🔖 Why are we not changing color of the indent icon?

                        I have already discussed about it in the DECREASE_INDENT___CHILD component, check that out.
                    */}

                    {/* Increase Indent's icon is depending on the direction state, if the direction is 'rtl', the icon must be different.  */}

                    {rte_state.formats_of_selected_text.direction === 'rtl' ?

                        /* this icon will be used only when the direction is 'rtl' (for example while writing arabic)*/

                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatIndentDecreaseRounded}
                        />

                        :

                        /* normally, this icon will be used */
                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatIndentIncreaseRounded}
                        />

                    }

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}
