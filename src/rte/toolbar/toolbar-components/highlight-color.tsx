/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// hook
import { useImmer } from "use-immer";


// color-picker library
import { ChromePicker } from 'react-color';


// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import {FormatColorFillRounded} from '../mui/icons'


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip,
    Popover
} from '../mui/components'




/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function HIGHLIGHT_COLOR___COMPONENT(props:type_of_toolbar_option_component_props) {

    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


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

        update_wysiwyg_state((draft) => {
            draft.formats_of_selected_text.background = hexColor;
        })
    }


    return (
        <>

            <Tooltip title="Highlight Color" placement="top">
                <FormControl margin="dense">
                    <IconButton onClick={handleOpenPopover}>
                        <FormatColorFillRounded
                            sx={(theme) => ({

                                // as we are using boxShadow, we are reducing the size of the icon than usual
                                fontSize: '1rem',
                                boxShadow: `0px 0px 2px 2px ${wysiwyg_state.formats_of_selected_text.background ? wysiwyg_state.formats_of_selected_text.background : theme.palette.text.primary}`
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
                <ChromePicker color={wysiwyg_state.formats_of_selected_text.background} onChange={handleColorChange} disableAlpha={true} />
            </Popover>


        </>
    );
}

