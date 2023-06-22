/*__________________________________________

 ✅ import
____________________________________________*/

// hook
import React from 'react'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer';
import { useLogger, useUpdateEffect } from 'react-use';

//theme
import MuiTheme, { PrimaryColorType } from "../theme/theme"

// components
import Box from '@mui/material/Box';
import WYSIWYG___COMPONENT from './wysiwyg/wysiwyg'

import { useRef } from 'react'




/*__________________________________________

 ✅ types
____________________________________________*/




export type richTextEditorPropsType = {


    dark: boolean,
    primaryColor: PrimaryColorType,

    toolbarOptions: Array<
        'clear_format' |
        'undo' |
        'redo' |
        'font' |
        'header' |
        'bold' |
        'italic' |
        'underline' |
        'strikethrough' |
        'text_color' |
        'highlight_color' |
        'numbered_list' |
        'bulleted_list' |
        'align' |
        'decrease_indent' |
        'increase_indent' |
        'direction' |
        'blockquote' |
        'code_block' |
        'link' |
        'image' |
        'embed_youtube_video' |
        'sub_script' |
        'super_script' |
        'binary_image'
    >,


    fetchOutput: any
    fetchImageInfo?: any
    fetchUtils?: any
    fetchEditorStatus?: any

}



/*__________________________________________

 ✅ Hook
____________________________________________*/


// 🥪 Functional component 
const RichTextEditor: React.ComponentType<richTextEditorPropsType> = (props) => {


    // 🥪 props
    const {
        dark,
        primaryColor,
        toolbarOptions,
        fetchOutput,
        fetchImageInfo,
        fetchUtils,
        fetchEditorStatus
    } = props



    // 🥪 quill's reference 
    const quillRef = useRef(null)




    // 🥪 all the states of the WYSIWYG editor in one place! 
    const wysiwyg_initial_state = {

        /* property to store the HTML generated by Quill */
        quill_generated_html: '',

        /* property to store the cursor position and selection range*/
        editor_cursor: {
            position: 0, //initial
            selection_length: 0 //initial
        },


        // property to track all the images and their activities
        images: {

            last_uploaded_image_link: '',

            all_uploaded_images_info: [],

            all_uploaded_images_link: [],

            all_inserted_images_link: [],

            all_removed_images_link: [],
        },


        /* property to track formats of the selected text */
        formats_of_selected_text: {
            header: 0,
            font: 'sans-serif',
            bold: false,
            italic: false,
            underline: false,
            strike: false, // strikethrough
            list: false,  // ordered & unordered(bullet) list
            align: false, //text alignment
            indent: 0,
            direction: false, //rtl, ltr
            blockquote: false,
            'code-block': false,
            link: '', //inserted link
            script: false


            /* 🔖
                we don't need the 'image' & 'video' property here because we don't track them with quillRef.current.getFormat().image or quillRef.current.getFormat().video  in their IMAGE___SECTION Or VIDEO___SECTION component
            */
        }
    }


    const [wysiwyg_state, update_wysiwyg_state] = useImmer(wysiwyg_initial_state)


    // useLogger('🛑 wysiwyg_state', wysiwyg_state)



    // 🥪 updating the "output" state whenever "wysiwyg_state" gets updated 
    useEffect(() => {

        fetchOutput(wysiwyg_state.quill_generated_html)


        if (fetchImageInfo) {

            fetchImageInfo(prevState => ({

                ...prevState, // copy the previous state

                uploadedImages: [...wysiwyg_state.images.all_uploaded_images_info],

                removedImages: [...wysiwyg_state.images.all_removed_images_link]
            }))


        }





    }, [wysiwyg_state])





    const [hasFocus, setHasFocus] = useState(false)
    const [totalWords, setTotalWords] = useState(0)

    useLogger('totalWords', totalWords)




    const countWords = () => {
        const text = quillRef.current.getText().trim();
        const words = text.split(/\s+/);
        return words.length;
    }



    useEffect(() => {


        if (fetchUtils) {

            fetchUtils(prevState => ({

                ...prevState, // Copy the previous state

                resetEditor: () => {
                    quillRef.current.setText('')
                },

                /* even if we use '' for resetting, quill will reset by generating this html '<p><br></p>' */


                focusOnEditor: () => {
                    quillRef.current.focus()
                },

                removeFocusFromEditor: () => {
                    quillRef.current.blur()
                },



            }))

        }




        const check = () => {
            setTotalWords(countWords())

            setHasFocus(quillRef.current.hasFocus())
        }



        quillRef.current.on('editor-change', check)


        return () => {
            quillRef.current.off('editor-change', check)
        }


    }, [quillRef.current])







    useUpdateEffect(() => {

        if (fetchEditorStatus) {

            fetchEditorStatus(prevState => ({

                ...prevState, // Copy the previous state

                totalWords: totalWords,

                hasFocus: hasFocus



            }))

        }



    }, [totalWords, hasFocus])












    /* ✅ TSX ✅ */

    return (

        <>


            <MuiTheme dark={dark} primaryColor={primaryColor}>

                <Box sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: '1rem'
                })}>



                    <WYSIWYG___COMPONENT
                        quillRef={quillRef}
                        wysiwyg_initial_state={wysiwyg_initial_state}
                        wysiwyg_state={wysiwyg_state}
                        update_wysiwyg_state={update_wysiwyg_state}
                        display_these_toolbar_options_in_the_parent_form={toolbarOptions}
                    />

                </Box>

            </MuiTheme>

        </>

    )


}






export default RichTextEditor














