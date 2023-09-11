/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { FormatQuoteRounded } from '../mui/icons'


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

export default function BLOCKQUOTE___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🫓 handleBlockQuote
    const handleBlockQuote = () => {

        const isBlockQuote = quillRef.current.getFormat().blockquote

        if (isBlockQuote) {
            quillRef.current.format('blockquote', false);

            update_rte_state(draft => {
                draft.formats_of_selected_text.blockquote = false
            })
        }

        else {
            quillRef.current.format('blockquote', true);

            update_rte_state(draft => {
                draft.formats_of_selected_text.blockquote = true
            })
        }
    }

    return (
        <Tooltip title="Blockquote" placement="top">

            <FormControl margin='dense'>

                <IconButton size='small' onClick={handleBlockQuote}>

                    <MUI_ICON___REUSABLE

                        ICON_COMPONENT={FormatQuoteRounded}
                        condition_to_use_primary_color={rte_state.formats_of_selected_text.blockquote}
                    />


                </IconButton>

            </FormControl>

        </Tooltip>
    )
}
