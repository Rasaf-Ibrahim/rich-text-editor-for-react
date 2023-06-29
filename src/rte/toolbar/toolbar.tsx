/*__________________________________________

 ✅ import
____________________________________________*/

import React from 'react'

// hook
import { useLogger, useUpdateEffect } from "react-use";
import { useImmer } from "use-immer";
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';


// color-picker library
import { ChromePicker } from 'react-color';


// icons
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import UndoRounded from "@mui/icons-material/UndoRounded";
import RedoRounded from "@mui/icons-material/RedoRounded";
import FormatBoldRounded from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRounded from "@mui/icons-material/FormatItalicRounded";
import FormatUnderlinedRounded from "@mui/icons-material/FormatUnderlinedRounded";
import FormatStrikethroughRounded from "@mui/icons-material/FormatStrikethroughRounded";
import FormatListNumberedRounded from "@mui/icons-material/FormatListNumberedRounded";
import FormatListBulletedRounded from "@mui/icons-material/FormatListBulletedRounded";
import FormatAlignLeftRounded from "@mui/icons-material/FormatAlignLeftRounded";
import FormatAlignRightRounded from "@mui/icons-material/FormatAlignRightRounded";
import FormatAlignCenterRounded from "@mui/icons-material/FormatAlignCenterRounded";
import FormatAlignJustifyRounded from "@mui/icons-material/FormatAlignJustifyRounded";
import FormatIndentDecreaseRounded from "@mui/icons-material/FormatIndentDecreaseRounded";
import FormatIndentIncreaseRounded from "@mui/icons-material/FormatIndentIncreaseRounded";
import FormatTextdirectionLToRRounded from "@mui/icons-material/FormatTextdirectionLToRRounded";
import FormatTextdirectionRToLRounded from "@mui/icons-material/FormatTextdirectionRToLRounded";
import FormatQuoteRounded from "@mui/icons-material/FormatQuoteRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import FormatColorTextRounded from "@mui/icons-material/FormatColorTextRounded";
import FormatColorFillRounded from "@mui/icons-material/FormatColorFillRounded";
import LinkRounded from "@mui/icons-material/LinkRounded";
import SubscriptRounded from "@mui/icons-material/SubscriptRounded";
import SuperscriptRounded from "@mui/icons-material/SuperscriptRounded";
import FormatClearRounded from "@mui/icons-material/FormatClearRounded";


// styled components
import {
    MODAL_CONTENT___STYLED,
    SELECT___STYLED,
    MENU_ITEM___STYLED,
} from "./styled-components/styled-components";


// mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Divider from '@mui/material/Divider'

import Modal from '@mui/material/Modal'
import Popover from '@mui/material/Popover'
import Tooltip from '@mui/material/Tooltip'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'


// toolbar components
import IMAGE_CLOUDINARY___COMPONENT from "./toolbar-components/image-cloudinary";
import IMAGE_BASE64___COMPONENT from './toolbar-components/image-base64';
import EMBED_YOUTUBE_VIDEO___COMPONENT from './toolbar-components/embed-youtube-video';
import IMAGE_EDIT___COMPONENT from './toolbar-components/edit-image';



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
            component: CLEAR_FORMAT___SECTION
        },


        {
            name: 'undo',
            component: UNDO___SECTION
        },

        {
            name: 'redo',
            component: REDO___SECTION
        },

        {
            name: 'font',
            component: FONT___SECTION
        },

        {
            name: 'header',
            component: HEADER___SECTION
        },

        {
            name: 'bold',
            component: BOLD___SECTION
        },

        {
            name: 'italic',
            component: ITALIC___SECTION
        },

        {
            name: 'underline',
            component: UNDERLINE___SECTION
        },

        {
            name: 'strikethrough',
            component: STRIKE_THROUGH___SECTION
        },


        {
            name: 'numbered_list',
            component: ORDERED_LIST___SECTION
        },


        {
            name: 'bulleted_list',
            component: UNORDERED_LIST___SECTION
        },

        {
            name: 'align',
            component: ALIGN___SECTION
        },

        {
            name: 'decrease_indent',
            component: DECREASE_INDENT___SECTION
        },


        {
            name: 'increase_indent',
            component: INCREASE_INDENT___SECTION
        },


        {
            name: 'direction',
            component: DIRECTION___SECTION
        },


        {
            name: 'blockquote',
            component: BLOCKQUOTE___SECTION
        },



        {
            name: 'code_block',
            component: CODE_BLOCK___SECTION
        },


        {
            name: 'text_color',
            component: TEXT_COLOR___SECTION
        },

        {
            name: 'highlight_color',
            component: HIGHLIGHT_COLOR___SECTION
        },

        {
            name: 'link',
            component: LINK___SECTION
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
            component: SUB_SCRIPT___SECTION
        },


        {
            name: 'super_script',
            component: SUPER_SCRIPT___SECTION
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
    );
}






/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


/*🔖 FONT___SECTION has most of the note type of components, to understand the code of FONT___SECTION and similar kind of component's code, reading these comments are essential!  */


const FONT___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleFont = (event) => {

        const selectedValue = event.target.value;

        quillRef.current.format('font', selectedValue);


        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.font = selectedValue
        })


        /* 🔖 Just like handleFont, in the handleHeader, handleBold, etc functions, you will see that we are updating both the 
        
            1) quillRef.current.format & 
            2) wysiwyg_state.formats_of_selected_text state


          There is no confusion in updating the quillRef.current.format but why are updating the state as well? 

          Let me first remind you, 'wysiwyg_state.formats_of_selected_text' state holds the formats of the selected text. We are  updating this state in the 'selection-change' event of quill

          So, when we select a text and change its format the state gets updated automatically inside the 'selection-change' event. So,  there is no need to update the state manually here in this 'handleFont' function when we select a text 

          But what about when we haven't written anything, there will be nothing to select, right? 
          
          Suppose, we have gone to a new line and before writing anything we want to change the font and bold option for the new line first before typing. How would you do that? 
          
          In this situation, 'selection-change' event will not get triggered because we are not selecting any text. So, there is no way we can update the state 'wysiwyg_state.formats_of_selected_text' if we just depend of 'selection-change' event's state update.

          So, we need to update the state manually as well in the handleFont, handleHeader, handleItalic, etc functions so that we can even update the state even when we haven't selected any text. 
        */
    }



    return (

        <Tooltip title="Font" placement="top">
            {/* 🔖 Not all options of the <Select/> component has same text size. So, width of <Select/> keeps changing based on the text size of the selected option. To avoid this situation, we are wrapping the <Select/> component with <FormControl/> and providing it the minWidth based on the largest text from the options.

            Here, in the options, 'MonoSpace' is the largest text, based on it, we are using 6 rem here as minWidth. 
            */}

            {/* 🔖 In the FONT___SECTION, HEADER___SECTION, etc component where in the JSX, we are using, <Select/> component, using <FormControl/> has become must. 
            
            To stay consistent with the design, we will use <FormControl/> in other components (BOLD___SECTION, ITALIC___SECTION), even if <FormControl/> is not needed there.
            */}
            <FormControl sx={{ minWidth: '6.3rem' }} margin='dense'>

                <SELECT___STYLED
                    onChange={(event) => handleFont(event)}
                    value={wysiwyg_state.formats_of_selected_text.font}
                    sx={{
                        color: wysiwyg_state.formats_of_selected_text.font === 'sans-serif' ? 'text.primary' : 'primary.dark',



                        /*🔖 
                        
                        - Only for few toolbar options, we are using  the <Select/> component.
                        
                        - <Select/> component has bigger padding  bottom.
                        
                        - But as for most of the toolbar options, we are not using <Select/> component, this extra padding bottom is making the deSign Inconsistent. 
                        
                        - Also, in the other toolbar options, there the padding left and padding right is 0.5rem. But <Select/> component doesn't have this much padding left and padding right.
                        
                        - To fix all these issues,  we will make the padding bottom 0.05rem and padding left and right 0.5rem.*/

                        '.MuiSelect-select': {
                            paddingBottom: '0.05rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                        },
                    }}
                >

                    {/* We have only added the fonts here that we have whitelisted and registered */}
                    <MENU_ITEM___STYLED value="sans-serif">Sans Serif</MENU_ITEM___STYLED>

                    <MENU_ITEM___STYLED value="serif">Serif</MENU_ITEM___STYLED>

                    <MENU_ITEM___STYLED value="monospace">MonoSpace</MENU_ITEM___STYLED>

                </SELECT___STYLED>
            </FormControl>
        </Tooltip>
    )
}




/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/

const HEADER___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleHeader = (event) => {

        const selectedValue = event.target.value;

        const headerFormat = selectedValue === 0 ? false : selectedValue;

        quillRef.current.format('header', headerFormat);

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.header = selectedValue
        })
    }

    return (

        <Tooltip title="Heading" placement="top">

            <FormControl sx={{ minWidth: '6rem' }} margin='dense'>

                <SELECT___STYLED
                    onChange={handleHeader}
                    value={wysiwyg_state.formats_of_selected_text.header}
                    sx={{
                        color: wysiwyg_state.formats_of_selected_text.font === 0 ? 'text.primary' : 'primary.dark',

                        '.MuiSelect-select': {
                            paddingBottom: '0.05rem',
                            paddingLeft: '0.5rem',
                            paddingRight: '0.5rem',
                        },
                    }}>

                    <MENU_ITEM___STYLED value={0}>Normal</MENU_ITEM___STYLED>
                    <MENU_ITEM___STYLED value={1}>Heading 1</MENU_ITEM___STYLED>
                    <MENU_ITEM___STYLED value={2}>Heading 2</MENU_ITEM___STYLED>
                    <MENU_ITEM___STYLED value={3}>Heading 3</MENU_ITEM___STYLED>
                    <MENU_ITEM___STYLED value={4}>Heading 4</MENU_ITEM___STYLED>
                    <MENU_ITEM___STYLED value={5}>Heading 5</MENU_ITEM___STYLED>
                    <MENU_ITEM___STYLED value={6}>Heading 6</MENU_ITEM___STYLED>

                </SELECT___STYLED>

            </FormControl>

        </Tooltip>

    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const BOLD___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleBold = () => {

        const isBold = quillRef.current.getFormat().bold;

        if (isBold) {
            quillRef.current.format('bold', false);
        } else {
            quillRef.current.format('bold', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.bold = !draft.formats_of_selected_text.bold
        })
    }

    return (
        <Tooltip title="Bold" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handleBold}>
                    <FormatBoldRounded sx={(theme) => ({

                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.bold ? theme.palette.primary.dark : theme.palette.text.primary

                    })} />
                </IconButton>
            </FormControl>
        </Tooltip>
    )
}



/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const ITALIC___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleItalic = () => {
        const isItalic = quillRef.current.getFormat().italic;

        if (isItalic) {
            quillRef.current.format('italic', false);
        } else {
            quillRef.current.format('italic', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.italic = !draft.formats_of_selected_text.italic
        })
    }


    return (
        <Tooltip title="Italic" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleItalic}>

                    <FormatItalicRounded sx={(theme) => ({

                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.italic ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />
                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/



const UNDERLINE___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleUnderline = () => {
        const isUnderline = quillRef.current.getFormat().underline;

        if (isUnderline) {
            quillRef.current.format('underline', false);
        } else {
            quillRef.current.format('underline', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.underline = !draft.formats_of_selected_text.underline
        })
    }


    return (

        <Tooltip title="Underline" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleUnderline}>

                    <FormatUnderlinedRounded sx={(theme) => ({

                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.underline ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const STRIKE_THROUGH___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleStrikeThrough = () => {

        const isStrikeThrough = quillRef.current.getFormat().strike;

        if (isStrikeThrough) {
            quillRef.current.format('strike', false);
        } else {
            quillRef.current.format('strike', true);
        }

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.strike = !draft.formats_of_selected_text.strike
        })
    }


    return (

        <Tooltip title="Strikethrough" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleStrikeThrough}>

                    <FormatStrikethroughRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.strike ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/

const ORDERED_LIST___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    /* ⚠️⚠️⚠️ Fix this bug in the future!
    
     - Suppose, we have selected a text and changed its heading to anything else than 'normal' or before selecting the text, the text already had heading anything other than 'normal'

     - Now, after selecting the text, when we make it a ordered list, the text becomes a list, also the heading becomes 'normal'.
     
     - But until we remove our cursor or selection, it will not indicate in the toolbar that the text has 'normal'  heading 

     - To fix this issue, I tried what I did in the <CLEAR_FORMAT___SECTION/> by using useUpdateEffect but it's not working perfectly

     - Maybe it's not working because when I make the text a list, the selections goes away. Think about it in the future!

  
    
    */


    const handleOrderedList = () => {

        const isOrdered = quillRef.current.getFormat().list === 'ordered'

        if (isOrdered) {
            quillRef.current.format('list', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = false
            })

        } else {
            quillRef.current.format('list', 'ordered');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = 'ordered'
            })

        }


    }


    return (

        <Tooltip title="Ordered List" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleOrderedList}>

                    <FormatListNumberedRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.list === 'ordered' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const UNORDERED_LIST___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {

    const handleUnorderedList = () => {

        const isBulleted = quillRef.current.getFormat().list === 'bullet'

        if (isBulleted) {
            quillRef.current.format('list', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = false
            })

        }

        else {
            quillRef.current.format('list', 'bullet');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = 'bullet'
            })
        }

    }


    return (

        <Tooltip title="Bullet List" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleUnorderedList}>

                    <FormatListBulletedRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.list === 'bullet' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const ALIGN___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


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


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const DECREASE_INDENT___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {

    const handleIndent = () => {

        let indent = quillRef.current.getFormat().indent;

        let current_indent = typeof indent === 'undefined' ? 0 : indent

        let new_indent

        if (current_indent === 0) {
            new_indent = current_indent
        }
        else {
            new_indent = current_indent - 1
        }


        quillRef.current.format('indent', new_indent);

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.indent = new_indent;
        })
    }



    return (

        <Tooltip title="Decrease Indent" placement="top">

            <FormControl margin="dense">

                <IconButton onClick={handleIndent}>

                    {/* 🔖 Why are we not changing color of the indent icon?

                        - increase indent or decrease indent icon doesn't need to have a separate color when the selected text is indented

                        - it's not like bold that a text is already bold and we can click on the bold button again to unbold it.
                        
                        - indent isn't a boolean value, it's a number and it can get increased or decreased. And there is also two separate icon for increasing and decreasing.
                        
                        - So, when a selected text has a indent of more than 0, both increase and decrease indent icon can be used to change the current indent. So, it doesn't make to highlight one of them or both of them with a different color. 
                    */}

                    {/* Decrease Indent's icon is depending on the direction state, if the direction is 'rtl', the icon must be different. */}

                    {wysiwyg_state.formats_of_selected_text.direction === 'rtl' ?

                        /* this icon will be used only when the direction is 'rtl' (for example while writing arabic)*/
                        <FormatIndentIncreaseRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />

                        :

                        /* normally, this icon will be used */
                        <FormatIndentDecreaseRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />

                    }

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}




/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/

const INCREASE_INDENT___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {

    const handleIndent = () => {

        let indent = quillRef.current.getFormat().indent;

        let current_indent = typeof indent === 'undefined' ? 0 : indent

        let new_indent

        // setting 7 to be the maximum level of indent
        if (current_indent === 7) {
            new_indent = current_indent
        }
        else {
            new_indent = current_indent + 1
        }


        quillRef.current.format('indent', new_indent);

        update_wysiwyg_state(draft => {
            draft.formats_of_selected_text.indent = new_indent;
        })
    }



    return (
        /* Normally, it's a increase indent but when the direction is 'rtl', it will be a decrease indent. */
        <Tooltip title='Increase Indent' placement="top">

            <FormControl margin="dense">

                <IconButton onClick={handleIndent}>

                    {/* 🔖 Why are we not changing color of the indent icon?

                        I have already discussed about it in the DECREASE_INDENT___SECTION component, check that out.
                    */}

                    {/* Increase Indent's icon is depending on the direction state, if the direction is 'rtl', the icon must be different.  */}

                    {wysiwyg_state.formats_of_selected_text.direction === 'rtl' ?

                        /* this icon will be used only when the direction is 'rtl' (for example while writing arabic)*/
                        <FormatIndentDecreaseRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />

                        :

                        /* normally, this icon will be used */
                        <FormatIndentIncreaseRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />

                    }

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const DIRECTION___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {

    const handleDirection = () => {

        const direction = quillRef.current.getFormat().direction;

        if (direction === 'rtl') {

            quillRef.current.format('direction', false);

            // also need to change the align, false means left
            quillRef.current.format('align', false);


            //  updating the state as well
            update_wysiwyg_state(draft => {

                draft.formats_of_selected_text.direction = false

                draft.formats_of_selected_text.align = false
            })


        } else {


            quillRef.current.format('direction', 'rtl');

            // also need to change the align
            quillRef.current.format('align', 'right');


            //  updating the state as well
            update_wysiwyg_state(draft => {

                draft.formats_of_selected_text.direction = 'rtl'

                draft.formats_of_selected_text.align = 'right'
            })
        }

    }


    return (
        <Tooltip title="Direction" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handleDirection}>

                    {wysiwyg_state.formats_of_selected_text.direction === 'rtl' ?

                        <FormatTextdirectionRToLRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                            color: theme.palette.primary.dark
                        })} />

                        :

                        <FormatTextdirectionLToRRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                            color: theme.palette.text.primary
                        })} />

                    }

                </IconButton>
            </FormControl>
        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const BLOCKQUOTE___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleBlockQuote = () => {

        const isBlockQuote = quillRef.current.getFormat().blockquote

        if (isBlockQuote) {
            quillRef.current.format('blockquote', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.blockquote = false
            })
        }

        else {
            quillRef.current.format('blockquote', true);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.blockquote = true
            })
        }
    }

    return (
        <Tooltip title="Blockquote" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleBlockQuote}>

                    <FormatQuoteRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.blockquote ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const CODE_BLOCK___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleCodeBlock = () => {

        const isCodeBlock = quillRef.current.getFormat()['code-block']

        if (isCodeBlock) {
            quillRef.current.format('code-block', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text['code-block'] = false
            })
        }

        else {


            quillRef.current.format('code-block', true);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text['code-block'] = true
            })
        }
    }

    return (
        <Tooltip title="Code Block" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleCodeBlock}>

                    <CodeRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text['code-block'] ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const TEXT_COLOR___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {

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


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const HIGHLIGHT_COLOR___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {

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
};


/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/



const LINK___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {



    // state to handle all the possible changes of this component
    const initial_state = {

        open_modal: false,

        text_is_selected: false,

        link_already_exist: false,

        link: ''
    }


    const [link_state, update_link_state] = useImmer(initial_state)



    const handle_click_on_the_link_button = () => {

        // if link already exists
        if (wysiwyg_state.formats_of_selected_text.link.length > 0) {

            update_link_state(draft => {
                draft.link_already_exist = true
                draft.open_modal = true
            })

        }

        // if link doesn't already exist
        else {


            const selected_text = quillRef.current.getSelection()

            // check if the user has selected any text or not
            if (selected_text && selected_text.length > 0) {

                update_link_state(draft => {
                    draft.text_is_selected = true
                    draft.open_modal = true
                })

            }

            // if user haven't selected any text
            else {
                update_link_state(draft => {
                    draft.text_is_selected = false
                    draft.open_modal = true
                })
            }

        }


    }


    const handle_input_change = (e) => {

        update_link_state(draft => {
            draft.link = e.target.value;
        })
    }


    //  when a user submits the link, the following function gets triggered
    const handle_submit = () => {

        quillRef.current.format('link', link_state.link)

        update_wysiwyg_state(draft => {

            draft.formats_of_selected_text.link = link_state.link
        })


        update_link_state(draft => {

            // closing the modal
            draft.open_modal = false

        })
    }


    const handle_modal_close = () => {

        // when the modal closes, change the state back to initial values
        update_link_state(initial_state)
    }



    return (
        <>
            <Tooltip title="Link" placement="top">

                <FormControl margin='dense'>

                    <IconButton onClick={handle_click_on_the_link_button} >

                        <LinkRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                            color: wysiwyg_state.formats_of_selected_text.link ? theme.palette.primary.dark : theme.palette.text.primary
                        })} />

                    </IconButton>

                </FormControl>

            </Tooltip>




            <Modal open={link_state.open_modal} onClose={handle_modal_close}>

                <MODAL_CONTENT___STYLED>


                    {(() => {


                        if (link_state.link_already_exist) {


                            return (

                                <Typography variant='body2' sx={{ textAlign: 'center' }}>Link already exists on your selected text. Just click on the text in the editor, you will get options to edit or remove the link.</Typography>
                            )

                        }

                        else {


                            if (link_state.text_is_selected) {


                                return (

                                    <Box component='form' onSubmit={handle_submit}
                                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

                                        <TextField
                                            label="URL Link"
                                            variant="outlined"
                                            value={link_state.link}
                                            onChange={handle_input_change}
                                            size='small'
                                        />

                                        <Button type="submit" variant="contained" size='small' >
                                            Submit
                                        </Button>

                                    </Box>
                                )




                            }

                            else {


                                return (

                                    <Typography variant='body2' sx={{ padding: '1rem', textAlign: 'center' }}>Please select some text before trying to insert a link.</Typography>
                                )


                            }

                        }
                    })()}





                </MODAL_CONTENT___STYLED>

            </Modal>

        </>
    )
}















/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const SUB_SCRIPT___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleSubScript = () => {

        const isSubScript = quillRef.current.getFormat().script === 'sub'

        if (isSubScript) {
            quillRef.current.format('script', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = false
            })

        } else {
            quillRef.current.format('script', 'sub');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = 'sub'
            })
        }

    }


    return (

        <Tooltip title="SubScript" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleSubScript}>

                    <SubscriptRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.script === 'sub' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}




/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const SUPER_SCRIPT___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state }) => {


    const handleSubScript = () => {

        const isSubScript = quillRef.current.getFormat().script === 'super'

        if (isSubScript) {
            quillRef.current.format('script', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = false
            })

        } else {
            quillRef.current.format('script', 'super');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.script = 'super'
            })
        }

    }


    return (

        <Tooltip title="SuperScript" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleSubScript}>

                    <SuperscriptRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.script === 'super' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}




/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const UNDO___SECTION = ({ quillRef }) => {

    const handle_undo = () => {

        quillRef.current.history.undo()
    }


    return (

        <Tooltip title="Undo" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handle_undo}>
                    <UndoRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                    })} />
                </IconButton>
            </FormControl>
        </Tooltip>

    )


}



/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const REDO___SECTION = ({ quillRef }) => {

    const handle_redo = () => {

        quillRef.current.history.redo()
    }


    return (

        <Tooltip title="Redo" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handle_redo}>
                    <RedoRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                    })} />
                </IconButton>
            </FormControl>
        </Tooltip>

    )


}




/*__________________________________________
 ✅ Section of <WYSIWYG_TOOLBAR___COMPONENT/>
____________________________________________*/


const CLEAR_FORMAT___SECTION = ({ quillRef, wysiwyg_state, update_wysiwyg_state, wysiwyg_initial_state }) => {



    /* 🔖 Why do I need the following state?
    
     Suppose, I have selected a text. If the selected text is bolded, the bold button will normally have a different color to indicate the selected text is bolded.

     But what if after selecting the bold text, instead of clicking the bold button to unbold it, I click on the remove format button to remove the bold formatting. The text will no longer have bold format but the bold button will still have the color which indicates that the text is bolded until we remove our cursor or selection.


     To fix this issue, we are having the following state. We will trigger the following state after removing format of the selected text.

     The state change will trigger a useUpdateEffect, where I am getting the format of the selected text after removing its format, then we are updating 'wysiwyg_state.formats_of_selected_text'  state so that all the toolbar options' buttons reflects true state of the selected text.
    
    */


    const [remove_format_state, update_remove_format_state] = useImmer({
        trigger_format_checking: false
    })



    const handle_clear_format = () => {

        const range = quillRef.current.getSelection();
        if (range) {
            quillRef.current.removeFormat(range.index, range.length);
        }


        update_remove_format_state(draft => {
            draft.trigger_format_checking = !draft.trigger_format_checking
        })
    }




    /* Updating the wysiwyg_state.formats_of_selected_text */
    useUpdateEffect(() => {

        // getting the format after using removeFormat
        const format = quillRef.current.getFormat(wysiwyg_state.editor_cursor.position, wysiwyg_state.editor_cursor.selection_length)

        // updating
        update_wysiwyg_state(draft => {

            draft.formats_of_selected_text = { ...wysiwyg_initial_state.formats_of_selected_text, ...format }
        })


    }, [remove_format_state.trigger_format_checking]);



    return (
        <Tooltip title="Clear Format" placement="top">
            <FormControl margin='dense'>
                <IconButton onClick={handle_clear_format}>
                    <FormatClearRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                    })} />
                </IconButton>
            </FormControl>
        </Tooltip>
    )
}





































