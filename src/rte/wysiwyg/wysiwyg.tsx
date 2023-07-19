/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// hook
import { useRef } from 'react';
import { useLogger, useMount, useUpdateEffect } from 'react-use';
import { useTheme } from '@mui/material/styles';

// quillRef Library
import Quill from 'quill';

/* We don't need to  import 'quill/dist/quill.snow.css' because we have created Styled Component (<CSS_FOR_QUILL_EDITOR____STYLED/>) to replace it.  */


// highlightJS library
import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css'
import 'highlight.js/styles/monokai-sublime.css';

// styled components
import { CSS_FOR_QUILL_EDITOR____STYLED } from '../toolbar/styled-components/styled-components';

// components
import { Box } from '../toolbar/mui/components';
import WYSIWYG_TOOLBAR___COMPONENT from '../toolbar/toolbar';
import { type_of_wysiwyg_state } from '../types/types-for-the-library';



/*🥪 assigning the Quill object to the window object to make it globally */
window.Quill = Quill


declare global {
    interface Window {
        Quill: typeof Quill;
    }
}



/*  🥪 importing and registering font  */
let fonts = Quill.import("attributors/style/font");
fonts.whitelist = ["sans-serif", "serif", "monospace"];
Quill.register(fonts, true);


/*  🥪 importing and registering font size but I have no intension to use font size now. Heading is enough!  */
const fontSizeArr = ['10px', '11px', '12px', '14px', '18px', '24px'];
var Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);




/*  🔖 After version 0.1.0, I have removed the "quill-image-resize-module/quill-image-resize" package.

If I ever need to use the quill-image-resize package again, I can check version 0.1.0's this file(path at that time: src/rte/wysiwyg/wysiwyg.tsx). Because all the "quill-image-resize" package's code was in this file.


But I don't think that I will ever go back to use the package again. Because:


    - the package use 'px'. So, the resized image is not responsive. They will have a fixed width.

    - resizing doesn't work in the touch screen because the package only works with mouse event!


*/


/*__________________________________________

 ✅ types 
____________________________________________*/

type type_of_wysiwyg_props = {

    quillRef: type_of_anything

    wysiwyg_initial_state: type_of_wysiwyg_state

    wysiwyg_state: type_of_wysiwyg_state

    update_wysiwyg_state: type_of_anything

    display_these_toolbar_options_in_the_parent_form: type_of_anything

    customizeUI: type_of_anything

}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function WYSIWYG___COMPONENT(props: type_of_wysiwyg_props) {


    const {
        quillRef,
        wysiwyg_initial_state,
        wysiwyg_state,
        update_wysiwyg_state,
        display_these_toolbar_options_in_the_parent_form,
        customizeUI
    } = props


    const { primaryColor, stickyToolbarOnScroll } = customizeUI


    // mui theme 
    const theme = useTheme()




    /* 🔖 We will use the following 'quillEditorRef ' in a <Box/> component.
        
        When the component is rendered, the quillEditorRef  hook will hold a reference to the DOM node of the <Box> component, allowing the Quill editor to be initialized and rendered inside it. This approach is necessary because Quill.ts requires a DOM node to be passed as the container for the editor.
    */

    // quill editor's reference
    const quillEditorRef = useRef(null);





    /* When the component first mounts,  setting up the Quill editor and performing various tasks, such as setting up different modules, theme.*/
    useMount(() => {

        quillRef.current = new Quill(quillEditorRef.current, {

            modules: {

                /* 🔖 
                
                - Actually, I don't need the default toolbar but if make the toolbar false, then tooltip for the inserted link will not work. 
                
                - So, setting the value of the toolbar to true but in the css, we are using .ql-toolbar{display:none} to hide the toolbar. */
                toolbar: true,

                syntax: {
                    highlight: function (highlight_code_param) {
                        return hljs.highlightAuto(highlight_code_param).value;
                    },
                },


                history: {

                    /* 🔖  Specifies the number of milliseconds to wait before a change to the editor's contents is added to the undo/redo history stack. This is useful for batching together multiple changes that occur within a short period of time, such as when the user types quickly. The default value is `1000` (1 second).*/
                    delay: 1000,

                    /*🔖 Specifies the maximum number of changes to keep in the undo/redo history stack. Once the stack reaches this limit, older changes will be discarded to make room for newer ones. The default value is `100`. */
                    maxStack: 500,


                    /* 🔖 When `userOnly` is set to `true` in the Quill editor's `history` options, only changes made by the user, such as typing or pasting text, will be tracked in the undo/redo history stack. This means that any programmatic changes made to the editor's contents, such as applying or removing formatting programmatically, will not be tracked in the history and cannot be undone or redone using the `history.undo()` or `history.redo()` method.
 
                   To enable tracking of programmatic changes in the undo/redo history stack, you should set `userOnly` to `false` in the `history` options*/
                    userOnly: false

                },



                /* 🔖 We are not having any module for resizing imbedded video because:
                
                Resizing images in a rich text editor is important because images can have pixelation issues if they are stretched or resized improperly. This can lead to a degradation in the quality of the image, which can negatively impact the user's experience.

                On the other hand, resizing embedded videos in a rich text editor may not be so much important, as videos do not have the same issues with pixelation.

                However, we will make sure with predefined CSS that the imbedded video has a decent size in the editor.
                */


            },

            theme: 'snow'
        })



    })




    // updating 'quill_generated_html' property of the 'wysiwyg_state' state
    useUpdateEffect(() => {

        quillRef.current.on('text-change', function (delta, oldDelta, source) {

            update_wysiwyg_state(draft => {
                draft.quill_generated_html = quillRef.current.root.innerHTML
            })

        })

    }, [quillRef.current])





    // updating 'editor_cursor' property of the 'wysiwyg_state' state
    useUpdateEffect(() => {


        const update_cursor_position_on_selection_change = (range, oldRange, source) => {

            if (range) {

                update_wysiwyg_state(draft => {
                    draft.editor_cursor.position = range.index;
                    draft.editor_cursor.selection_length = range.length;
                })

            }
        }



        const update_cursor_position_on_text_change = (delta, oldDelta, source) => {

            let position = 0;

            delta.forEach(op => {

                if (op.retain) {
                    position += op.retain;
                } else if (op.insert) {
                    position += op.insert.length;
                } else if (op.delete) {
                    position -= op.delete;
                }

            })

            // Ensure position is never negative
            position = position < 0 ? 0 : position;


            update_wysiwyg_state(draft => {
                draft.editor_cursor.position = position
                draft.editor_cursor.selection_length = 0 // when text changes, we are not selecting, so length will be 0
            })
        }



        // Listen for selection change and text change events
        quillRef.current.on('selection-change', update_cursor_position_on_selection_change);
        quillRef.current.on('text-change', update_cursor_position_on_text_change);



        // Remove event listeners on cleanup
        return () => {
            quillRef.current.off('selection-change', update_cursor_position_on_selection_change);
            quillRef.current.off('text-change', update_cursor_position_on_text_change);
        }


    }, [quillRef.current]);





    // updating 'formats_of_selected_text.custom_align' property of the 'wysiwyg_state' state, whenever wysiwyg_state.editor_cursor.position changes
    useUpdateEffect(() => {


        const [leaf] = quillRef.current.getLeaf(wysiwyg_state.editor_cursor.position)

        const element = leaf && leaf.domNode

        const parentElement = element?.parentElement


        // array of the all the classes
        let classes_array = parentElement?.className.split(" ")


        for (let i = 0; i < classes_array?.length; i++) {

            // if any class startsWith "ql-custom-align"
            if (classes_array[i].startsWith("ql-custom-align")) {

                // if the class endsWith "center"
                if (classes_array[i].endsWith("center")) {

                    update_wysiwyg_state(draft => {
                        draft.formats_of_selected_text.custom_align = 'center'
                    })

                }


                // if the class endsWith "right"
                if (classes_array[i].endsWith("right")) {

                    update_wysiwyg_state(draft => {
                        draft.formats_of_selected_text.custom_align = 'right'
                    })

                }

            }



            // no ql-custom-align className
            else {

                update_wysiwyg_state(draft => {
                    draft.formats_of_selected_text.custom_align = 'left'
                })

            }

        }






    }, [wysiwyg_state.editor_cursor.position])





    // updating the 'images.all_inserted_images_link' value of the wysiwyg_state when 'quill_generated_html' value of wysiwyg_state changes
    useUpdateEffect(() => {

        // array of all the image tag from the generated html
        const imageTagArray = wysiwyg_state.quill_generated_html.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/g) || [];

        // array of all the images link from the generated html
        const imageSourceArray = imageTagArray.map(link => link.match(/src=["']([^"']+)["']/)[1]);


        // updating the 'images.all_inserted_images_link' value of the wysiwyg_state
        if (imageSourceArray) {

            update_wysiwyg_state(draft => {

                /* 🔖 In the following state update, 
 
                     - To ensure that 'images.all_inserted_images_link' only contains all the images link from the latest HTML change, we have created a new array and copied all the elements of the  'imageSourceArray' with spread operator.
                     
                     - We are not using  'concat' method as it would merge the previous elements of 'images.all_inserted_images_link' with the elements from imageSourceArray, resulting in an array containing elements from multiple HTML changes. 
                     
                     - Using the 'push' method is also not a viable solution, as it would push the entire 'imageSourceArray' into 'images.all_inserted_images_link' as a nested array.
                */

                draft.images.all_inserted_images_link = [...imageSourceArray]

            })

        }


    }, [wysiwyg_state.quill_generated_html])





    // updating the 'images.all_removed_images_link' value of the wysiwyg_state when 'images.all_inserted_images_link' value of wysiwyg_state changes
    useUpdateEffect(() => {

        // updating the 'images.all_removed_images_link' value of the wysiwyg_state 
        update_wysiwyg_state(draft => {

            draft.images.all_removed_images_link = draft.images.all_uploaded_images_link.filter(element => !draft.images.all_inserted_images_link.includes(element));

        })

    }, [wysiwyg_state.images.all_inserted_images_link])






































    // ✅ JSX 
    return (

        <Box>

            {/*making the toolbar sticky at top when we scroll down */}
            <Box sx={stickyToolbarOnScroll ? { position: 'sticky', top: 0, zIndex: 999 } : {}} >

                <WYSIWYG_TOOLBAR___COMPONENT
                    quillRef={quillRef}
                    display_these_toolbar_options_in_the_parent_form={display_these_toolbar_options_in_the_parent_form}

                    wysiwyg_initial_state={wysiwyg_initial_state}
                    wysiwyg_state={wysiwyg_state}
                    update_wysiwyg_state={update_wysiwyg_state}
                />

            </Box>

            <CSS_FOR_QUILL_EDITOR____STYLED>

                {/* Editor */}
                <Box ref={quillEditorRef}>
                </Box>

            </CSS_FOR_QUILL_EDITOR____STYLED>


        </Box>

    )
}















