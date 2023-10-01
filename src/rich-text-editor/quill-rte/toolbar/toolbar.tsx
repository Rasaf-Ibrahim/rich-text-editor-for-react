/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'


// types
import { type_of_rte_state, type_of_update_rte_state, type_of_display_these_toolbar_options } from '../../../types/types-for-the-library'
import { defaultVisibleToolbarOptionsType, imageValidationType } from '../../../types/types-for-the-users'
import { type_of_anything } from '../../../types/commonly-used-types'


// hook
import { useUpdateEffect } from '../../../dependencies/react-use/react-use'
import { useImmer } from "../../../dependencies/use-immer/use-immer"
import { useTheme, useMediaQuery } from '../../../dependencies/mui/hooks'


// icons
import { ExpandMoreRounded, ExpandLessRounded } from '../../../dependencies/mui/icons'


// mui components
import {
    Box,
    Button,
    Divider
} from '../../../dependencies/mui/components'


// toolbar components
import CLEAR_FORMAT___COMPONENT from './toolbar-components/clear-format'
import UNDO___COMPONENT from './toolbar-components/undo'
import REDO___COMPONENT from './toolbar-components/redo'

import FONT___COMPONENT from './toolbar-components/font'
import HEADER___COMPONENT from './toolbar-components/header'

import BOLD___COMPONENT from './toolbar-components/bold'
import ITALIC___COMPONENT from './toolbar-components/italic'
import UNDERLINE___COMPONENT from './toolbar-components/underline'
import STRIKE_THROUGH___COMPONENT from './toolbar-components/strikethrough'


import ORDERED_LIST___COMPONENT from './toolbar-components/numbered-list'

import ALIGN___COMPONENT from './toolbar-components/align'
import UNORDERED_LIST___COMPONENT from './toolbar-components/bulleted-list'

import INCREASE_INDENT___COMPONENT from './toolbar-components/increase-indent';
import DECREASE_INDENT___COMPONENT from './toolbar-components/decrease-indent'

import DIRECTION___COMPONENT from './toolbar-components/direction'

import BLOCKQUOTE___COMPONENT from './toolbar-components/blockquote'
import CODE_BLOCK___COMPONENT from './toolbar-components/code-block'

import TEXT_COLOR___COMPONENT from './toolbar-components/text-color'
import HIGHLIGHT_COLOR___COMPONENT from './toolbar-components/highlight-color'

import SUB_SCRIPT___COMPONENT from './toolbar-components/sub-script'
import SUPER_SCRIPT___COMPONENT from './toolbar-components/super-script'



import IMAGE_CLOUD___COMPONENT from "./toolbar-components/image-cloud"
import IMAGE_BASE64___COMPONENT from './toolbar-components/image-base64'
import FORMAT_MEDIA___COMPONENT from './toolbar-components/format-media'
import EMBED_VIDEO___COMPONENT from './toolbar-components/embed-video'
import LINK___COMPONENT from './toolbar-components/link';

import WORD_COUNT___COMPONENT from './toolbar-components/word-count'





/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_toolbar_props = {

    quillRef: type_of_anything

    display_these_toolbar_options: type_of_display_these_toolbar_options

    rte_initial_state: type_of_rte_state

    rte_state: type_of_rte_state

    update_rte_state: type_of_update_rte_state

    imageValidation: imageValidationType

    defaultVisibleToolbarOptions: defaultVisibleToolbarOptionsType

    dividerInToolbar: boolean
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function TOOLBAR___COMPONENT(props: React.PropsWithChildren<type_of_toolbar_props>) {



    // props 
    const {
        quillRef,
        display_these_toolbar_options,
        rte_initial_state,
        rte_state,
        update_rte_state,
        imageValidation,
        defaultVisibleToolbarOptions,
        dividerInToolbar = true
    } = props




    /* Updating the rte_state.formats_of_selected_text value on selection-change */
    useUpdateEffect(() => {

        // Add event listener to the Quill instance for selection changes
        quillRef.current.on('selection-change', (range, oldRange, source) => {

            // We want to update state only when a selection exists
            if (range) {
                // Get the formatting options of the selected text
                const format = quillRef.current.getFormat(range.index, range.length);
                // Update the state with the formatting options of the selected text

                update_rte_state(draft => {

                    draft.formats_of_selected_text = { ...rte_initial_state.formats_of_selected_text, ...format }
                })





            }


            else {
                // If no text is selected, reset the value to its initial state
                update_rte_state(draft => {

                    draft.formats_of_selected_text = { ...rte_initial_state.formats_of_selected_text }
                })


            }

        })


    }, [quillRef.current]);








    /* 🥔🥔 toolbar options 🥔🥔 */

    /* 🔖 To create 2 toolbar features, I had create the following 'toolbar_all_options' array and unique component for each toolbar option. Read the following details to know in details: 

     - This <TOOLBAR___COMPONENT/>  is a part of a reusable component.

     - As we are creating a reusable component, we are having 2 flexible features for the toolbar : 
       
     - feature-1) from the parent component, what options in the toolbar we want can be defined
     - feature-2) from the parent component, serial of toolbar options can be defined
       
     - parent will send a display_these_toolbar_options

     - It will be an array of strings element, example:  ['bold', 'italic', 'header', 'font']

     - Each of the defined options will be in the toolbar and all the options will de display my maintaining serial


     - To achieve these 2 features, I had to make separate component for each of the toolbar options.

     - And I have created these components in this file, you can search them in this file: FONT___CHILD , HEADER___CHILD, BOLD___CHILD, etc.

     - Also, 2 achieve those 2 features, I had to make the following toolbar_all_options array of objects where each array is holding information of one component. 
     
     - If you notice, you will see that each object has name property in the following array. The parent component will use exactly the same name in the 'display_these_toolbar_options'. 

     - Check out the JSX to understand more


    */

    const toolbar_all_options = [

        /* 🔖 FONT___CHILD, HEADER___CHILD, BOLD___CHILD, etc are components, and they are all defined in this file. Just search them in this file if you want to edit them!
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
            name: 'image_cloud',
            component: IMAGE_CLOUD___COMPONENT
        },

        {
            name: 'format_media',
            component: FORMAT_MEDIA___COMPONENT
        },

        {
            name: 'embed_video',
            component: EMBED_VIDEO___COMPONENT
        },

        {
            name: 'sub_script',
            component: SUB_SCRIPT___COMPONENT
        },


        {
            name: 'super_script',
            component: SUPER_SCRIPT___COMPONENT
        },

        {
            name: 'word_count',
            component: WORD_COUNT___COMPONENT

        }




        /* 🔖 If you see the toolbar options, you will see that there is 'format_media' where image can be resized but we don't have any embedded video resizing option because:
        
            Resizing images in a rich text editor is important because images can have pixelation issues if they are stretched or resized improperly. This can lead to a degradation in the quality of the image, which can negatively impact the user's experience.

            On the other hand, resizing embedded videos in a rich text editor may not be so much important, as videos do not have the same issues with pixelation.

            However, we will make sure with predefined CSS that the imbedded video has a decent size in the editor.
        */





        /*⚠️⚠️⚠️  I have just skipped 1 toolbar option, that is 'formula'. In no way, currently I need it! So, I am not in hurry to add it. Read the documentation, I will maybe need an additional library to install for formula, it's called 'katex'. Maybe, the setup is kind of like the syntax highlighter setup. I am not sure actually, explore in the future when you have time!
        
        One more thing I want to say is that, for formula, on click on the option we will open a modal, just like embedding video option. 


        There additionally, I may have keyboard for formulas! That will be great. Check this out: https://justamouse.com/mathquill4quill/", I am talking about this.

        Just like for color option, we have added a separate library to pick color, we can do that for formula as well!
        
        */

    ]



    /* 🥔🥔 feature of showing and hiding toolbar options  🥔🥔 */


    // get the current theme object
    const theme = useTheme();



    // set media query hooks for phone, tablet and laptop screen sizes
    const phone_and_up = useMediaQuery(theme.breakpoints.down('sm'))
    const tablet_and_up = useMediaQuery(theme.breakpoints.down('lg'))

    // set default item count based on screen size
    let defaultItemCount

    if (phone_and_up) {
        // if on phone, show at most 5 items 
        defaultItemCount = defaultVisibleToolbarOptions?.phone || 5
    }
    else if (tablet_and_up) {
        // if on tablet, show at most 7 items
        defaultItemCount = defaultVisibleToolbarOptions?.tablet || 7
    }
    else {
        // if on laptop or larger, show at most 12 items 
        defaultItemCount = defaultVisibleToolbarOptions?.laptop || 12
    }

    // set state to control whether to show all toolbar items or not
    const [showMore, updateShowMore] = useImmer(false);

    // calculate the number of items that should be hidden
    const hiddenItemCount = display_these_toolbar_options.length - defaultItemCount;

    // toggle the state of showMore when the button is clicked
    const handle_click = () => {
        updateShowMore(!showMore)
    }














    /* A function to render toolbar options, it takes an array of options as an argument */
    const renderToolbarOptions = (options) => {

        /* Using the map() method, we process each option in the options array */
        return options.map(option_string => {

            /* Using the find() method, we check if the current option_string exists in the toolbar_all_options array */
            const found_option = toolbar_all_options.find(option_obj => option_obj.name === option_string)

            /* If the option is found, we render the corresponding component; otherwise, we render nothing (null) */
            return found_option ? (

                /* React.Fragment is used to group multiple children without adding extra nodes to the DOM */
                <React.Fragment key={option_string}>

                    {/* Here, we're rendering the component associated with the found_option and passing several props  */}
                    <found_option.component
                        quillRef={quillRef}
                        rte_initial_state={rte_initial_state}
                        rte_state={rte_state}
                        update_rte_state={update_rte_state}
                        imageValidation={imageValidation}
                    />

                    {/*
                        "dividerInToolbar" prop's default value is "true". So, if the user doesn't explicitly sets it to false, we will render  render a Divider component for visual separation between the toolbar options  
                     */}

                    {dividerInToolbar ?

                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{
                                marginRight: '2px',
                                marginLeft: '2px'
                            }}
                        />

                        :

                        <Box sx={{
                            marginRight: '2px',
                            marginLeft: '2px'
                        }} />
                    }


                </React.Fragment>

            ) : null /* If the option isn't found, we return null, meaning no component will be rendered for this option */
        })
    }





    // ✅ JSX

    return (
        <Box sx={{

            // appearance
            backgroundColor: theme.palette.background.default,

            color: theme.palette.text.primary,

            boxShadow: `0px 0px 2px 2px ${theme.palette.divider}`,

            // layout
            paddingRight: '1rem',
            paddingLeft: '1rem',

            // others
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: '0.3rem',
            rowGap: '0rem',
        }}>

            {/* Toolbar components */}
            {renderToolbarOptions(display_these_toolbar_options.slice(0, defaultItemCount))}

            {showMore === true && renderToolbarOptions(display_these_toolbar_options.slice(defaultItemCount))}


            {/* More & Less Button */}
            {!showMore && hiddenItemCount > 0 && (
                <Button onClick={handle_click} variant='text' size='small' sx={{ fontSize: 'overline.fontSize' }}>
                    <ExpandMoreRounded /> More
                </Button>
            )}

            {showMore === true && (
                <Button onClick={handle_click} variant='text' size='small' sx={{ fontSize: 'overline.fontSize' }}>
                    <ExpandLessRounded /> Less
                </Button>
            )}


        </Box>

    )
}