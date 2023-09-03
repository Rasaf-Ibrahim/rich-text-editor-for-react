/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import {
    FormatTextdirectionLToRRounded,
    FormatTextdirectionRToLRounded
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

export default function DIRECTION___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🫓 handleDirection
    const handleDirection = () => {

        const direction = quillRef.current.getFormat().direction;

        if (direction === 'rtl') {

            quillRef.current.format('direction', false);

            // also need to change the align, false means left
            quillRef.current.format('align', false);


            //  updating the state as well
            update_rte_state(draft => {

                draft.formats_of_selected_text.direction = 'ltr'

                draft.formats_of_selected_text.align = false
            })


        } else {


            quillRef.current.format('direction', 'rtl');

            // also need to change the align
            quillRef.current.format('align', 'right');


            //  updating the state as well
            update_rte_state(draft => {

                draft.formats_of_selected_text.direction = 'rtl'

                draft.formats_of_selected_text.align = 'right'
            })
        }

    }


    return (
        <Tooltip title="Direction" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handleDirection}>

                    {rte_state.formats_of_selected_text.direction === 'rtl' ?


                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatTextdirectionRToLRounded}
                        />

                        :

                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatTextdirectionLToRRounded}
                        />

                    }

                </IconButton>
            </FormControl>
        </Tooltip>
    )
}