/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'


// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import { FormatListNumberedRounded } from '../mui/icons'


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip,
} from '../mui/components'





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function ORDERED_LIST___COMPONENT(props:type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props



   
    /* ⚠️⚠️⚠️ Fix this bug in the future!
    
     - Suppose, we have selected a text and changed its heading to anything else than 'normal' or before selecting the text, the text already had heading anything other than 'normal'

     - Now, after selecting the text, when we make it a ordered list, the text becomes a list, also the heading becomes 'normal'.
     
     - But until we remove our cursor or selection, it will not indicate in the toolbar that the text has 'normal'  heading 

     - To fix this issue, I tried what I did in the <CLEAR_FORMAT___SECTION/> by using useUpdateEffect but it's not working perfectly

     - Maybe it's not working because when I make the text a list, the selections goes away. Think about it in the future!
    
    */


    const handleOrderedList = () => {

        const isOrdered = quillRef.current.getFormat().list === 'ordered'

        if (isOrdered) {
            quillRef.current.format('list', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = false
            })

        } else {
            quillRef.current.format('list', 'ordered');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = 'ordered'
            })

        }


    }


    return (

        <Tooltip title="Ordered List" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleOrderedList}>

                    <FormatListNumberedRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.list === 'ordered' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}