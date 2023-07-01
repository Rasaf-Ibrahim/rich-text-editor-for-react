


/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {
    FormatAlignLeftRounded,
    FormatAlignRightRounded,
    FormatAlignCenterRounded,
    FormatAlignJustifyRounded
} from '../mui/icons'


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
export default function ALIGN___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props



    // 🥪 handleAlign
    const handleAlign = (event) => {
        const selectedValue = event.target.value;

        quillRef.current.format('align', selectedValue)

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.align = selectedValue
        })
    }


    return (

        <Tooltip title="Align Text" placement="top">

            <FormControl sx={{ minWidth: '3rem' }} margin='dense'>

                <SELECT___STYLED
                    onChange={handleAlign}
                    value={wysiwyg_state.formats_of_selected_text.align}

                    sx={{
                        color: wysiwyg_state.formats_of_selected_text.align === false ? 'text.primary' : 'primary.dark',

                        '.MuiSelect-select': {
                            paddingBottom: '0.05rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                        },


                    }}

                    // controlling the styles of menus with MenuProps
                    MenuProps={{
                        MenuListProps: {
                            sx: {
                                padding: '0rem',
                                display: 'flex',
                                flexWrap: 'wrap',
                                paddingTop: '0rem',
                                paddingBottom: '0rem'
                            },
                        },
                    }}>


                    <MENU_ITEM___STYLED value={false}>
                        <Tooltip title="Left" placement="bottom" arrow>
                            <FormatAlignLeftRounded sx={{ fontSize: '1.1rem' }} />
                        </Tooltip>
                    </MENU_ITEM___STYLED>


                    <MENU_ITEM___STYLED value='center'>
                        <Tooltip title="Center" placement="bottom" arrow>
                            <FormatAlignCenterRounded sx={{ fontSize: '1.1rem' }} />
                        </Tooltip>
                    </MENU_ITEM___STYLED>


                    <MENU_ITEM___STYLED value='right'>
                        <Tooltip title="Right" placement="bottom" arrow>
                            <FormatAlignRightRounded sx={{ fontSize: '1.1rem' }} />
                        </Tooltip>
                    </MENU_ITEM___STYLED>



                    <MENU_ITEM___STYLED value='justify'>
                        <Tooltip title="Justify" placement="bottom" arrow>
                            <FormatAlignJustifyRounded sx={{ fontSize: '1.1rem' }} />
                        </Tooltip>
                    </MENU_ITEM___STYLED>


                </SELECT___STYLED>

            </FormControl>
        </Tooltip>
    )
}
