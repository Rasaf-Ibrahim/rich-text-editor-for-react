/*🔖 FONT___COMPONENT has most of the note type of components, to understand the code of FONT___COMPONENT and similar kind of component's code, reading these comments are essential!  */


/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// styled components
import { 
    SELECT___STYLED, 
    MENU_ITEM___STYLED
} from '../styled-components/styled-components';


// mui components
import  {
    FormControl,
    Tooltip,
} from '../mui/components'





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/


export default function FONT___COMPONENT (props: type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props



    // 🥪 handleFont
    const handleFont = (event) => {

        const selectedValue = event.target.value;

        quillRef.current.format('font', selectedValue);


        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.font = selectedValue
        })


        /* 🔖 Just like handleFont, in the handleHeader, handleBold, etc functions, you will see that we are updating both the 
        
            1) quillRef.current.format & 
            2) wysiwyg_state.formats_of_selected_text state


          There is no confusion in updating the quillRef.current.format but why are updating the state as well? 

          Let me first remind you, 'wysiwyg_state.formats_of_selected_text' state holds the formats of the selected text. We are  updating this state in the 'selection-change' event of quill

          So, when we select a text and change its format the state gets updated automatically inside the 'selection-change' event. So,  there is no need to update the state manually here in this 'handleFont' function when we select a text 

          But what about when we haven't written anything, there will be nothing to select, right? 
          
          Suppose, we have gone to a new line and before writing anything we want to change the font and bold option for the new line first before typing. How would you do that? 
          
          In this situation, 'selection-change' event will not get triggered because we are not selecting any text. So, there is no way we can update the state 'wysiwyg_state.formats_of_selected_text' if we just depend of 'selection-change' event's state update.

          So, we need to update the state manually as well in the handleFont, handleHeader, handleItalic, etc functions so that we can even update the state even when we haven't selected any text. 
        */
    }



    return (

        <Tooltip title="Font" placement="top">
            {/* 🔖 Not all options of the <Select/> component has same text size. So, width of <Select/> keeps changing based on the text size of the selected option. To avoid this situation, we are wrapping the <Select/> component with <FormControl/> and providing it the minWidth based on the largest text from the options.

            Here, in the options, 'MonoSpace' is the largest text, based on it, we are using 6 rem here as minWidth. 
            */}

            {/* 🔖 In the FONT___COMPONENT, HEADER___SECTION, etc component where in the JSX, we are using, <Select/> component, using <FormControl/> has become must. 
            
            To stay consistent with the design, we will use <FormControl/> in other components (BOLD___SECTION, ITALIC___SECTION), even if <FormControl/> is not needed there.
            */}
            <FormControl sx={{ minWidth: '6.3rem' }} margin='dense'>

                <SELECT___STYLED
                    onChange={(event) => handleFont(event)}
                    value={wysiwyg_state.formats_of_selected_text.font}
                    sx={{
                        color: wysiwyg_state.formats_of_selected_text.font === 'sans-serif' ? 'text.primary' : 'primary.dark',



                        /*🔖 
                        
                        - Only for few toolbar options, we are using  the <Select/> component.
                        
                        - <Select/> component has bigger padding  bottom.
                        
                        - But as for most of the toolbar options, we are not using <Select/> component, this extra padding bottom is making the deSign Inconsistent. 
                        
                        - Also, in the other toolbar options, there the padding left and padding right is 0.5rem. But <Select/> component doesn't have this much padding left and padding right.
                        
                        - To fix all these issues,  we will make the padding bottom 0.05rem and padding left and right 0.5rem.*/

                        '.MuiSelect-select': {
                            paddingBottom: '0.05rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                        },
                    }}
                >

                    {/* We have only added the fonts here that we have whitelisted and registered */}
                    <MENU_ITEM___STYLED value="sans-serif">Sans Serif</MENU_ITEM___STYLED>

                    <MENU_ITEM___STYLED value="serif">Serif</MENU_ITEM___STYLED>

                    <MENU_ITEM___STYLED value="monospace">MonoSpace</MENU_ITEM___STYLED>

                </SELECT___STYLED>
            </FormControl>
        </Tooltip>
    )
}