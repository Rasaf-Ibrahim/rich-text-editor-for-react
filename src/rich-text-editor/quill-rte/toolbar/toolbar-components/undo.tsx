/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { UndoRounded } from '../mui/icons';

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


export default function UNDO___COMPONENT(props: type_of_toolbar_option_component_props) {

    // 🫓 props
    const { quillRef } = props




    const handle_undo = () => {

        quillRef.current.history.undo()
    }


    return (

        <Tooltip title="Undo" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handle_undo} size='small'>
                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={UndoRounded}
                    />
                </IconButton>
            </FormControl>
        </Tooltip>

    )


}


