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
import {FormatColorTextRounded} from '../mui/icons'


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
export default function TEXT_COLOR___COMPONENT(props:type_of_toolbar_option_component_props) {


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

        quillRef.current.format('color', hexColor);

        update_wysiwyg_state((draft) => {
            draft.formats_of_selected_text.color = hexColor;
        })
    }


    return (
        <>
            <Tooltip title="Text Color" placement="top">
                <FormControl margin="dense">
                    <IconButton onClick={handleOpenPopover}>
                        <FormatColorTextRounded
                            sx={(theme) => ({

                                // as we are using boxShadow, we are reducing the size of the icon than usual
                                fontSize: '1rem',
                                boxShadow: `0px 0px 2px 2px ${wysiwyg_state.formats_of_selected_text.color ? wysiwyg_state.formats_of_selected_text.color : theme.palette.text.primary}`,
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
                <ChromePicker color={wysiwyg_state.formats_of_selected_text.color} onChange={handleColorChange} disableAlpha={true} />
            </Popover>
        </>
    );
};
