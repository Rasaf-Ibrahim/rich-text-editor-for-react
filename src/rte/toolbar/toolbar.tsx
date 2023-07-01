/*__________________________________________

 ✅ import
____________________________________________*/

import React from 'react'

// hook
import { useUpdateEffect } from "react-use";
import { useImmer } from "use-immer";
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';


// color-picker library
import { ChromePicker } from 'react-color';


// icons
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";







// styled components
import {
    MODAL_CONTENT___STYLED,
} from "./styled-components/styled-components";


// mui components
import  {
    Box,
    Typography,
    Button,
    IconButton,
    FormControl,
    TextField,
    Tooltip,
    Popover,
    Modal,
    Divider
} from './mui/components'



// toolbar components
import CLEAR_FORMAT___COMPONENT from './toolbar-components/clear-format';
import UNDO___COMPONENT from './toolbar-components/undo';
import REDO___COMPONENT from './toolbar-components/redo';

import FONT___COMPONENT from './toolbar-components/font';
import HEADER___COMPONENT from './toolbar-components/header';

import BOLD___COMPONENT from './toolbar-components/bold';
import ITALIC___COMPONENT from './toolbar-components/italic';
import UNDERLINE___COMPONENT from './toolbar-components/underline'
import STRIKE_THROUGH___COMPONENT from './toolbar-components/strikethrough'


import ORDERED_LIST___COMPONENT from './toolbar-components/ordered-list'

import ALIGN___COMPONENT from './toolbar-components/align'
import UNORDERED_LIST___COMPONENT from './toolbar-components/unordered-list'

import INCREASE_INDENT___COMPONENT from './toolbar-components/increase-indent';
import DECREASE_INDENT___COMPONENT from './toolbar-components/decrease-indent'

import DIRECTION___COMPONENT from './toolbar-components/direction'

import BLOCKQUOTE___COMPONENT from './toolbar-components/blockquote'
import CODE_BLOCK___COMPONENT from './toolbar-components/code-block'

import TEXT_COLOR___COMPONENT from './toolbar-components/text-color'
import HIGHLIGHT_COLOR___COMPONENT from './toolbar-components/highlight-color'

import SUB_SCRIPT___COMPONENT from './toolbar-components/sub-script'
import SUPER_SCRIPT___COMPONENT from './toolbar-components/super-script'


import IMAGE_CLOUDINARY___COMPONENT from "./toolbar-components/image-cloudinary"
import IMAGE_BASE64___COMPONENT from './toolbar-components/image-base64'
import IMAGE_EDIT___COMPONENT from './toolbar-components/image_edit'
import EMBED_YOUTUBE_VIDEO___COMPONENT from './toolbar-components/embed-youtube-video'
import LINK___COMPONENT from './toolbar-components/link';








/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function WYSIWYG_TOOLBAR___COMPONENT({ quillRef, display_these_toolbar_options_in_the_parent_form, wysiwyg_initial_state, wysiwyg_state, update_wysiwyg_state }) {



    /* Updating the wysiwyg_state.formats_of_selected_text value on selection-change */
    useUpdateEffect(() => {

        // Add event listener to the Quill instance for selection changes
        quillRef.current.on('selection-change', (range, oldRange, source) => {

            // We want to update state only when a selection exists
            if (range) {
                // Get the formatting options of the selected text
                const format = quillRef.current.getFormat(range.index, range.length);
                // Update the state with the formatting options of the selected text

                update_wysiwyg_state(draft => {

                    draft.formats_of_selected_text = { ...wysiwyg_initial_state.formats_of_selected_text, ...format }
                })





            }


            else {
                // If no text is selected, reset the value to its initial state
                update_wysiwyg_state(draft => {

                    draft.formats_of_selected_text = { ...wysiwyg_initial_state.formats_of_selected_text }
                })


            }

        })


    }, [quillRef.current]);








    /* 🍔🍔 toolbar options 🍔🍔 */

    /* 🔖 To create 2 toolbar features, I had create the following 'toolbar_all_options' array and unique component for each toolbar option. Read the following details to know in details: 

     - This <WYSIWYG_TOOLBAR___COMPONENT/>  is a part of a reusable component.

     - As we are creating a reusable component, we are having 2 flexible features for the toolbar : 
       
     - feature-1) from the parent component, what options in the toolbar we want can be defined
     - feature-2) from the parent component, serial of toolbar options can be defined
       
     - parent will send a display_these_toolbar_options_in_the_parent_form

     - It will be an array of strings element, example:  ['bold', 'italic', 'header', 'font']

     - Each of the defined options will be in the toolbar and all the options will de display my maintaining serial


     - To achieve these 2 features, I had to make separate component for each of the toolbar options.

     - And I have created these components in this file, you can search them in this file: FONT___SECTION , HEADER___SECTION, BOLD___SECTION, etc.

     - Also, 2 achieve those 2 features, I had to make the following toolbar_all_options array of objects where each array is holding information of one component. 
     
     - If you notice, you will see that each object has name property in the following array. The parent component will use exactly the same name in the 'display_these_toolbar_options_in_the_parent_form'. 

     - Check out the JSX to understand more


    */

    const toolbar_all_options = [

        /* 🔖 FONT___SECTION, HEADER___SECTION, BOLD___SECTION, etc are components, and they are all defined in this file. Just search them in this file if you want to edit them!
        */

        {
            name: 'clear_format',
            component: CLEAR_FORMAT___COMPONENT
        },


        {
            name: 'undo',
            component: UNDO___COMPONENT
        },

        {
            name: 'redo',
            component: REDO___COMPONENT
        },

        {
            name: 'font',
            component: FONT___COMPONENT
        },

        {
            name: 'header',
            component: HEADER___COMPONENT
        },

        {
            name: 'bold',
            component: BOLD___COMPONENT
        },

        {
            name: 'italic',
            component: ITALIC___COMPONENT
        },

        {
            name: 'underline',
            component: UNDERLINE___COMPONENT
        },

        {
            name: 'strikethrough',
            component: STRIKE_THROUGH___COMPONENT
        },


        {
            name: 'numbered_list',
            component: ORDERED_LIST___COMPONENT
        },


        {
            name: 'bulleted_list',
            component: UNORDERED_LIST___COMPONENT
        },

        {
            name: 'align',
            component: ALIGN___COMPONENT
        },

        {
            name: 'decrease_indent',
            component: DECREASE_INDENT___COMPONENT
        },


        {
            name: 'increase_indent',
            component: INCREASE_INDENT___COMPONENT
        },


        {
            name: 'direction',
            component: DIRECTION___COMPONENT
        },


        {
            name: 'blockquote',
            component: BLOCKQUOTE___COMPONENT
        },



        {
            name: 'code_block',
            component: CODE_BLOCK___COMPONENT
        },


        {
            name: 'text_color',
            component: TEXT_COLOR___COMPONENT
        },

        {
            name: 'highlight_color',
            component: HIGHLIGHT_COLOR___COMPONENT
        },

        {
            name: 'link',
            component: LINK___COMPONENT
        },

        {
            name: 'image_base64',
            component: IMAGE_BASE64___COMPONENT
        },

        {
            name: 'image_cloudinary',
            component: IMAGE_CLOUDINARY___COMPONENT
        },

        {
            name: 'image_edit',
            component: IMAGE_EDIT___COMPONENT
        },

        {
            name: 'embed_youtube_video',
            component: EMBED_YOUTUBE_VIDEO___COMPONENT
        },

        {
            name: 'sub_script',
            component: SUB_SCRIPT___COMPONENT
        },


        {
            name: 'super_script',
            component: SUPER_SCRIPT___COMPONENT
        },





        /*⚠️⚠️⚠️  I have just skipped 1 toolbar option, that is 'formula'. In no way, currently I need it! So, I am not in hurry to add it. Read the documentation, I will maybe need an additional library to install for formula, it's called 'katex'. Maybe, the setup is kind of like the syntax highlighter setup. I am not sure actually, explore in the future when you have time!
        
        One more thing I want to say is that, for formula, on click on the option we will open a modal, just like embedding video option. 


        There additionally, I may have keyboard for formulas! That will be great. Check this out: https://justamouse.com/mathquill4quill/", I am talking about this.

        Just like for color option, we have added a separate library to pick color, we can do that for formula as well!
        
        */

    ]



    /* 🍔🍔 feature of showing and hiding toolbar options  🍔🍔 */


    // get the current theme object
    const theme = useTheme();

    // set media query hooks for phone, tablet and laptop screen sizes
    const phone_and_up = useMediaQuery(theme.breakpoints.down('sm'))
    const tablet_and_up = useMediaQuery(theme.breakpoints.down('lg'))

    // set default item count based on screen size
    let defaultItemCount

    if (phone_and_up) {
        // if on phone, show at most 5 items (at most 2 lines)
        defaultItemCount = 5
    }
    else if (tablet_and_up) {
        // if on tablet, show at most 7 items (at most 2 lines)
        defaultItemCount = 7
    }
    else {
        // if on laptop or larger, show at most 7 items (at most 1 line)
        defaultItemCount = 7
    }

    // set state to control whether to show all toolbar items or not
    const [showMore, updateShowMore] = useImmer(false);

    // calculate the number of items that should be hidden
    const hiddenItemCount = display_these_toolbar_options_in_the_parent_form.length - defaultItemCount;

    // toggle the state of showMore when the button is clicked
    const handle_click = () => {
        updateShowMore(!showMore)
    }



    /*__________________________________________
     ✅ JSX
    ____________________________________________*/

    return (
        <Box sx={{
            paddingRight: '1rem',
            paddingLeft: '1rem',


            backgroundColor: 'background.variation_2',

            /* the following box shadow is set as a complementary of the quill editor's(.ql-editor) box shadow  */
            boxShadow: `0px 0px 2px 2px ${theme.palette.divider}`,

            display: 'flex',
            columnGap: '0.3rem',
            rowGap: '0rem',
            flexWrap: 'wrap',
            alignItems: 'center',

        }}>
            {/* render only the default number of toolbar items */}
            {display_these_toolbar_options_in_the_parent_form.slice(0, defaultItemCount).map(option_string => {
                const found_option = toolbar_all_options.find(option_obj => option_obj.name === option_string);
                const JSX = found_option ? (
                    <>
                        <found_option.component
                            // sx={{ width: '100%' }}
                            quillRef={quillRef}
                            wysiwyg_initial_state={wysiwyg_initial_state}
                            wysiwyg_state={wysiwyg_state}
                            update_wysiwyg_state={update_wysiwyg_state}

                        />
                        <Divider orientation="vertical" variant="middle" flexItem />
                    </>
                ) : null;
                return JSX;
            })}

            {/* render the hidden toolbar items only when showMore is true */}
            {showMore && display_these_toolbar_options_in_the_parent_form.slice(defaultItemCount).map(option_string => {
                const found_option = toolbar_all_options.find(option_obj => option_obj.name === option_string);
                const JSX = found_option ? (
                    <>
                        <found_option.component
                            // sx={{ width: '100%' }}
                            quillRef={quillRef}
                            wysiwyg_initial_state={wysiwyg_initial_state}
                            wysiwyg_state={wysiwyg_state}
                            update_wysiwyg_state={update_wysiwyg_state}
                        />
                        <Divider orientation="vertical" variant="middle" flexItem />
                    </>
                ) : null;
                return JSX;
            })}

            {/* show the "More" button when not all items are shown */}
            {!showMore && hiddenItemCount > 0 && (
                <Button onClick={handle_click} variant='text' size='small' sx={{ fontSize: 'overline.fontSize' }}>
                    <ExpandMore /> More
                </Button>
            )}

            {/* show the "Less" button when all items are shown */}
            {showMore && (
                <Button onClick={handle_click} variant='text' size='small' sx={{ fontSize: 'overline.fontSize' }}>
                    <ExpandLess /> Less
                </Button>
            )}
        </Box>
    )
}