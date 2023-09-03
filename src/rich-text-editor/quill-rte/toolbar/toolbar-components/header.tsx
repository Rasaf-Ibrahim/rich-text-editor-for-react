
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

import Select from '@mui/material/Select/Select';



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function HEADER___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props



    // 🫓 handleHeader
    const handleHeader = (event) => {

        const selectedValue = event.target.value;

        const headerFormat = selectedValue === 0 ? false : selectedValue;

        quillRef.current.format('header', headerFormat);

        update_rte_state(draft => {
            draft.formats_of_selected_text.header = selectedValue
        })
    }






    // ✅ TSX
    return (

        <Tooltip title="Heading" placement="top">


            <SELECT___STYLED

                selected_value={rte_state.formats_of_selected_text.header}
                on_selection_change={handleHeader}

                type='text'
                width_of_the_largest_item='4.7rem'
                condition_of_using_primary_color={rte_state.formats_of_selected_text.header !== 0}
            >

                <MENU_ITEM___STYLED value={0}>Normal</MENU_ITEM___STYLED>
                <MENU_ITEM___STYLED value={1}>Heading 1</MENU_ITEM___STYLED>
                <MENU_ITEM___STYLED value={2}>Heading 2</MENU_ITEM___STYLED>
                <MENU_ITEM___STYLED value={3}>Heading 3</MENU_ITEM___STYLED>
                <MENU_ITEM___STYLED value={4}>Heading 4</MENU_ITEM___STYLED>
                <MENU_ITEM___STYLED value={5}>Heading 5</MENU_ITEM___STYLED>
                <MENU_ITEM___STYLED value={6}>Heading 6</MENU_ITEM___STYLED>

            </SELECT___STYLED>


        </Tooltip>

    )
}