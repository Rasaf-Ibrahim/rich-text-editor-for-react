/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { CodeRounded } from '../mui/icons'


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

export default function CODE_BLOCK___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🍪 handleCodeBlock
    const handleCodeBlock = () => {

        const isCodeBlock = quillRef.current.getFormat()['code-block']

        if (isCodeBlock) {
            quillRef.current.format('code-block', false);

            update_rte_state(draft => {
                draft.formats_of_selected_text['code-block'] = false
            })
        }

        else {


            quillRef.current.format('code-block', true);

            update_rte_state(draft => {
                draft.formats_of_selected_text['code-block'] = true
            })
        }
    }

    return (
        <Tooltip title="Code Block" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleCodeBlock} size='small'>

                    <MUI_ICON___REUSABLE

                        ICON_COMPONENT={CodeRounded}
                        condition_to_use_primary_color={rte_state.formats_of_selected_text['code-block']}

                    />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}
