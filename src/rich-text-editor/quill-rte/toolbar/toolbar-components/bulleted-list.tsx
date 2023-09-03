/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'


// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { FormatListBulletedRounded } from '../mui/icons';


// mui components
import {
    IconButton,
    FormControl,
    Tooltip,
} from '../mui/components'


// reusable components
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function UNORDERED_LIST___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props



    // 🫓 handleUnorderedList
    const handleUnorderedList = () => {

        const isBulleted = quillRef.current.getFormat().list === 'bullet'

        if (isBulleted) {
            quillRef.current.format('list', false);

            update_rte_state(draft => {
                draft.formats_of_selected_text.list = false
            })

        }

        else {
            quillRef.current.format('list', 'bullet');

            update_rte_state(draft => {
                draft.formats_of_selected_text.list = 'bullet'
            })
        }

    }


    return (

        <Tooltip title="Bulleted List" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleUnorderedList}>

                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={FormatListBulletedRounded}

                        condition_to_use_primary_color={rte_state.formats_of_selected_text.list === 'bullet'}
                    />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}
