/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {
    FormatTextdirectionLToRRounded,
    FormatTextdirectionRToLRounded
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

export default function DIRECTION___COMPONENT(props:type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // 🥪 handleDirection
    const handleDirection = () => {

        const direction = quillRef.current.getFormat().direction;

        if (direction === 'rtl') {

            quillRef.current.format('direction', false);

            // also need to change the align, false means left
            quillRef.current.format('align', false);


            //  updating the state as well
            update_wysiwyg_state(draft => {

                draft.formats_of_selected_text.direction = false

                draft.formats_of_selected_text.align = false
            })


        } else {


            quillRef.current.format('direction', 'rtl');

            // also need to change the align
            quillRef.current.format('align', 'right');


            //  updating the state as well
            update_wysiwyg_state(draft => {

                draft.formats_of_selected_text.direction = 'rtl'

                draft.formats_of_selected_text.align = 'right'
            })
        }

    }


    return (
        <Tooltip title="Direction" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handleDirection}>

                    {wysiwyg_state.formats_of_selected_text.direction === 'rtl' ?

                        <FormatTextdirectionRToLRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                            color: theme.palette.primary.dark
                        })} />

                        :

                        <FormatTextdirectionLToRRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                            color: theme.palette.text.primary
                        })} />

                    }

                </IconButton>
            </FormControl>
        </Tooltip>
    )
}