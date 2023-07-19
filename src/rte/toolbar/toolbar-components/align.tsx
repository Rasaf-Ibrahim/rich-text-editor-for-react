/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// utils
import { remove_image_align_classes } from '../utils/remove-image-align-classes'

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



        /* 🔖
        
            - To align image, we are using custom image aligning classes. 

            - After inserting an image, if we do not move the cursor manually and write any text in the same line or after moving in the next line by clicking the space button, the text will get the same custom image aligning classes.

            - Problem: once a text gets the custom image aligning classes, it's not possible possible to change the alignment of the text.

            - To solve this issue, we have to remove custom image align classes before we want to change the alignment of the text.  

            - "remove_image_align_classes" function will remove image align classes
        
        */
        remove_image_align_classes({
            quillRef:quillRef,
            wysiwyg_state:wysiwyg_state
        })


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


                    <MENU_ITEM___STYLED value={false} 

                    /* 🔖 If we choose "left" initially, the handleAlign doesn't get called because value hasn't changed. So, the remove_image_align_classes() doesn't get called too. To solve this issue, we are manually executing the "remove_image_align_classes" function on click on the left align button */
                    onClick={()=> remove_image_align_classes({
                        quillRef:quillRef,
                        wysiwyg_state:wysiwyg_state
                    })}
                    
                    >
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
