/*🔖 FONT___COMPONENT has most of the note type of components, to understand the code of FONT___COMPONENT and similar kind of component's code, reading these comments are essential!  */


/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// styled components
import {
    SELECT___STYLED,
    MENU_ITEM___STYLED
} from '../styled-components/styled-components';


// mui components
import {
    Tooltip,
} from '../mui/components'



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/


export default function FONT___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props



    // 🍪 handleFont
    const handleFont = (event) => {

        const selectedValue = event.target.value;

        quillRef.current.format('font', selectedValue);


        update_rte_state(draft => {
            draft.formats_of_selected_text.font = selectedValue
        })


        /* 🔖 Just like handleFont, in the handleHeader, handleBold, etc functions, you will see that we are updating both the 
        
            1) quillRef.current.format & 
            2) rte_state.formats_of_selected_text state


          There is no confusion in updating the quillRef.current.format but why are updating the "rte_state.formats_of_selected_text" as well? 

          Let me first remind you, 'rte_state.formats_of_selected_text' state holds the formats of the selected text. We are  updating this state in the 'selection-change' event of quill

          So, when we select a text and change its format the state gets updated automatically inside the 'selection-change' event. So,  there is no need to update the state manually here in this 'handleFont' function when we select a text 

          But what about when we haven't written anything, there will be nothing to select, right? 
          
          Suppose, we have gone to a new line and before writing anything we want to change the font and bold option for the new line first before typing. How would you do that? 
          
          In this situation, 'selection-change' event will not get triggered because we are not selecting any text. So, there is no way we can update the state 'rte_state.formats_of_selected_text' if we just depend of 'selection-change' event's state update.

          So, we need to update the state manually as well in the handleFont, handleHeader, handleItalic, etc functions so that we can even update the state even when we haven't selected any text. 
        */
    }



    return (

        <Tooltip title="Font" placement="top">

            <SELECT___STYLED

                selected_value={rte_state.formats_of_selected_text.font}
                on_selection_change={handleFont}

                type='text'
                width_of_the_largest_item='5rem'
                condition_of_using_primary_color={rte_state.formats_of_selected_text.font !== 'sans-serif'}>

                {/* We have only added the fonts here that we have whitelisted and registered */}
                <MENU_ITEM___STYLED value="sans-serif">Sans Serif</MENU_ITEM___STYLED>

                <MENU_ITEM___STYLED value="serif">Serif</MENU_ITEM___STYLED>

                <MENU_ITEM___STYLED value="monospace">MonoSpace</MENU_ITEM___STYLED>

            </SELECT___STYLED>

        </Tooltip>
    )
}