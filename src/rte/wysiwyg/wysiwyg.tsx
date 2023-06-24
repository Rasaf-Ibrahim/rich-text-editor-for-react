/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'
// hook
import { useRef } from 'react';
import { useMount, useUpdateEffect } from 'react-use';
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
import Box from '@mui/material/Box';
import WYSIWYG_TOOLBAR___COMPONENT from '../toolbar/toolbar';


/* 🔖 The official library for resizing image is the 'quill-image-resize-module' but why are we using 'quill-image-resize' library:

There is bug in the 'quill-image-resize-module' library. 
 
🍗The library's documentation says to import the library like this:
import { ImageResize } from 'quill-image-resize-module';

🍗 But importing the library like this will not work.

🍗 The library has last been updated back in 2017. So, there is no intention of solving this bug!

🍗 Many people are providing many solutions on this topic: https://github.com/kensnyder/quill-image-resize-module/issues/7


🍗 The following code has worked for me in the CRA(Create React App) Setup:

    window.Quill = Quill
    const ImageResize = require('quill-image-resize-module').default
    Quill.register('modules/imageResize', ImageResize)

🍗 ChatGPT has explained why the above code is fixing the import bug:

    -  The issue with importing the ImageResize module may be due to conflicts with the webpack configuration or dependencies, which can result in errors such as "moduleClass is not a constructor.

    - By using the window object to make the Quill object globally accessible, we are able to register the ImageResize module with it, thereby fixing the bug. 
    
    - Additionally, by using require instead of import, we are able to bypass any issues with webpack configuration or dependencies that may have caused errors with importing the module.


🍗 But with the Vite Setup, I can't use require(commonJS) by default. Even after installing commonJS plugin for Vite, I was getting other error.


🍗 Anyway, there were more solutions on the above mentioned link(https://github.com/kensnyder/quill-image-resize-module/issues/7), one of the popular solution was to use 'quill-image-resize' package instead which is built on top of 'quill-image-resize-module' package. 


*/


/*  🍔 importing and registering the 'quill-image-resize' library 🍔 */

import ImageResize from 'quill-image-resize'


// assigning the Quill object to the window object to make it globally 
window.Quill = Quill


declare global {
    interface Window {
      Quill: typeof Quill;
    }
  }
  

// registering the ImageResize module with the Quill object using the Quill.register() method
Quill.register({
    'modules/imageResize': ImageResize,
})


/*  🍔 importing and registering font  */
let fonts = Quill.import("attributors/style/font");
fonts.whitelist = ["sans-serif", "serif", "monospace"];
Quill.register(fonts, true);


/*  🍔 importing and registering font size but I have no intension to use font size now. Heading is enough!  */
// importing font size, But I have no intension to use font size now.
const fontSizeArr = ['10px', '11px', '12px', '14px', '18px', '24px'];
var Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function WYSIWYG___COMPONENT({
    quillRef,
    wysiwyg_initial_state,
    wysiwyg_state,
    update_wysiwyg_state,
    display_these_toolbar_options_in_the_parent_form,
    customizeUI
}) {


    const {primaryColor, stickyToolbarOnScroll} = customizeUI


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



                imageResize: {

                    // this is needed, I don't know why!
                    parchment: Quill.import('parchment'),


                    modules: ['Resize', 'DisplaySize', 'Toolbar'],


                    /* 🔖 the 'Resize' module adds handles to the image's corners which can be dragged with the mouse to resize the image.

                    we can provide css style to this with the following object
                    */
                    handleStyles: {
                        backgroundColor: primaryColor,
                        border: `0.3rem solid ${primaryColor}`
                    },

                    /* 🔖 the 'DisplaySize' module shows the size of the image in pixels near the bottom right of the image. 
                    
                    we can provide css style to this with the following object
                    */

                    displayStyles: {
                        backgroundColor: 'black',
                        color: 'white'
                    }


                    /* 🔖 resize limit: 

                     In the css, with '.ql-editor img', we have set max-width:90% and min-width:100px. So, any image can resized to maximum 90% of editor size and it can be resized to minimum 100px. 

                     If we don't use this min and max width, image can be resized to even 0px!

                    */

                }



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


            console.log('Cleaning up');
        }


    }, [quillRef.current]);





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









    /*__________________________________________

     ✅ JSX 
    ____________________________________________*/
    return (

        <Box>

            {/*making the toolbar sticky at top when we scroll down */}
            <Box sx={stickyToolbarOnScroll? { position: 'sticky', top: 0, zIndex: 999 }: {}} >

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















