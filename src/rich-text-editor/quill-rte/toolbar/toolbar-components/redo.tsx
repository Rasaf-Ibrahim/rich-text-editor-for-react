/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'


// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { RedoRounded } from '../../../../dependencies/mui/icons';


// mui components
import {
    IconButton,
    FormControl,
    Tooltip,
} from '../../../../dependencies/mui/components'


// reusable components
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';


/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function REDO___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🍪 props
    const { quillRef } = props




    const handle_redo = () => {

        quillRef.current.history.redo()
    }


    return (

        <Tooltip title="Redo" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handle_redo} size='small'>

                    <MUI_ICON___REUSABLE
                        ICON_COMPONENT={RedoRounded}
                    />

                </IconButton>
            </FormControl>
        </Tooltip>

    )


}



