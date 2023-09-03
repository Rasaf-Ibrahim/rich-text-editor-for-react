/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// hook
import { useImmer } from "use-immer";

// css in js
import { readableColor } from 'polished'


// color-picker library
import { TwitterPicker } from 'react-color';

// colors_for_color_picker array
import { colors_for_color_picker } from '../utils/colors-for-color-picker';

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { ColorizeRounded } from '../mui/icons'


// mui components
import {
    IconButton,
    FormControl,
    Tooltip,
    Popover
} from '../mui/components'


/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function HIGHLIGHT_COLOR___COMPONENT(props: type_of_toolbar_option_component_props) {

    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props


    const [anchorEl, updateAnchorEl] = useImmer(null);

    const handleOpenPopover = (event) => {
        updateAnchorEl(event.currentTarget);
    }

    const handleClosePopover = () => {
        updateAnchorEl(null);
    }

    const handleColorChange = (color) => {

        const hexColor = color.hex;

        quillRef.current.format('background', hexColor);

        update_rte_state((draft) => {
            draft.formats_of_selected_text.background = hexColor;
        })
    }






    return (
        <>

            <Tooltip title="Highlight Color" placement="top">
                <FormControl margin="dense">
                    <IconButton onClick={handleOpenPopover}>

                        {/* We will not use <MUI_ICON___REUSABLE/> for the following icon because the color chnage for this icon is slightly different.  */}

                        <ColorizeRounded
                            sx={(theme) => ({
                                fontSize: '1.2rem',

                                ...(rte_state.formats_of_selected_text.background ?

                                    {
                                        padding: '1px',

                                        color: readableColor(rte_state.formats_of_selected_text.background),

                                        backgroundColor: rte_state.formats_of_selected_text.background
                                    }

                                    :

                                    {
                                        color: theme.palette.secondary.main
                                    }
                                ),
                            })}
                        />
                    </IconButton>
                </FormControl>
            </Tooltip>


            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <TwitterPicker
                    color={rte_state.formats_of_selected_text.background}
                    onChange={handleColorChange}
                    colors={colors_for_color_picker}
                />
            </Popover>


        </>
    );
}
