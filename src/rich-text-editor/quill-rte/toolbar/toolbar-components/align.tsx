/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';

// theme hook
import { useTheme } from '../../../../dependencies/mui/hooks'

// utils
import { remove_image_align_classes } from '../utils/remove-image-align-classes'

// icons
import {
    FormatAlignLeftRounded,
    FormatAlignRightRounded,
    FormatAlignCenterRounded,
    FormatAlignJustifyRounded
} from '../../../../dependencies/mui/icons'

// css in js
import {
    SELECT___STYLED,
    MENU_ITEM___STYLED
} from '../styled-components/styled-components';

// mui components
import { Tooltip } from '../../../../dependencies/mui/components'

// reusable components
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';




/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function ALIGN___COMPONENT(props: type_of_toolbar_option_component_props) {

    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props

    // 🍪 theme
    const theme = useTheme()



    // 🍪 handleAlign
    const handleAlign = (event) => {



        /* 🔖
        
            - To align image, we are using custom image aligning classes. 

            - After inserting an image, if we do not move the cursor manually and write any text in the same line or after moving in the next line by clicking the space button, the text will get the same custom image aligning classes.

            - Problem: once a text gets the custom image aligning classes, it's not possible possible to change the alignment of the text.

            - To solve this issue, we have to remove custom image align classes before we want to change the alignment of the text.  

            - "remove_image_align_classes" function will remove image align classes
        
        */
        remove_image_align_classes({
            quillRef: quillRef,
            rte_state: rte_state
        })


        const selectedValue = event.target.value;

        quillRef.current.format('align', selectedValue)

        update_rte_state(draft => {
            draft.formats_of_selected_text.align = selectedValue
        })
    }




    return (

        <Tooltip title="Align Text" placement="top">

            <SELECT___STYLED

                selected_value={rte_state.formats_of_selected_text.align}
                on_selection_change={handleAlign}

                type='icon'
                width_of_the_largest_item='1.5rem'
                condition_of_using_primary_color={rte_state.formats_of_selected_text.align !== false}
            >


                <MENU_ITEM___STYLED value={false}

                    /* 🔖 If we choose "left" initially, the handleAlign doesn't get called because value hasn't changed. So, the remove_image_align_classes() doesn't get called too. To solve this issue, we are manually executing the "remove_image_align_classes" function on click on the left align button */
                    onClick={() => remove_image_align_classes({
                        quillRef: quillRef,
                        rte_state: rte_state
                    })}

                >
                    <Tooltip title="Left" placement="bottom" arrow>
                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatAlignLeftRounded}
                            icon_size='1.1rem'
                        />
                    </Tooltip>
                </MENU_ITEM___STYLED>


                <MENU_ITEM___STYLED value='center'>
                    <Tooltip title="Center" placement="bottom" arrow>
                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatAlignCenterRounded}
                            icon_size='1.1rem'
                        />
                    </Tooltip>
                </MENU_ITEM___STYLED>


                <MENU_ITEM___STYLED value='right'>
                    <Tooltip title="Right" placement="bottom" arrow>
                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatAlignRightRounded}
                            icon_size='1.1rem'
                        />
                    </Tooltip>
                </MENU_ITEM___STYLED>



                <MENU_ITEM___STYLED value='justify'>
                    <Tooltip title="Justify" placement="bottom" arrow>
                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={FormatAlignJustifyRounded}
                            icon_size='1.1rem'
                        />
                    </Tooltip>
                </MENU_ITEM___STYLED>


            </SELECT___STYLED>

        </Tooltip>
    )
}
