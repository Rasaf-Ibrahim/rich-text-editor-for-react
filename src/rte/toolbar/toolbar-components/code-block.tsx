/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {CodeRounded} from '../mui/icons'


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function CODE_BLOCK___COMPONENT (props:type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleCodeBlock
    const handleCodeBlock = () => {

        const isCodeBlock = quillRef.current.getFormat()['code-block']

        if (isCodeBlock) {
            quillRef.current.format('code-block', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text['code-block'] = false
            })
        }

        else {


            quillRef.current.format('code-block', true);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text['code-block'] = true
            })
        }
    }

    return (
        <Tooltip title="Code Block" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleCodeBlock}>

                    <CodeRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text['code-block'] ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}
