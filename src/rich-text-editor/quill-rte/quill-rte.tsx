/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// hook
import { useRef } from 'react';
import { useLogger, useMount, useUpdateEffect } from 'react-use';


// quill Library
import Quill from 'quill';

/* We don't need to  import 'quill/dist/quill.snow.css' because we have created Styled Component (<CSS_FOR_QUILL____STYLED/>) to replace it.  */

// types
import { type_of_rte_state, type_of_update_rte_state, type_of_display_these_toolbar_options } from '../../types/types-for-the-library'
import { customizeUiType, imageValidationType } from '../../types/types-for-the-users'

// highlightJS library
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'

// nono id
import { nanoid } from 'nanoid';

// css in js
import CSS_FOR_QUILL___STYLED from './css-for-quill/css-for-quill';


// components
import { Box } from './toolbar/mui/components';
import TOOLBAR___COMPONENT from './toolbar/toolbar';



/*__________________________________________

 ✅ Quill initial Setup
____________________________________________*/

// 🍪 assigning the Quill object to the window object to make it globally 
window.Quill = Quill

declare global {
    interface Window {
        Quill: typeof Quill
    }
}


// 🍪 importing and registering font 
let fonts = Quill.import("attributors/style/font");
fonts.whitelist = ["sans-serif", "serif", "monospace"];
Quill.register(fonts, true);


// 🍪 importing and registering font size but I have no intension to use font size now. Heading is enough!  
const fontSizeArr = ['10px', '11px', '12px', '14px', '18px', '24px'];
let Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;
Quill.register(Size, true);



/*  🔖 After version 0.1.0, I have removed the "quill-image-resize-module/quill-image-resize" package.

If I ever need to use the quill-image-resize package again, I can check version 0.1.0's this file(path at that time: src/rte/rte/rte.tsx). Because all the "quill-image-resize" package's code was in this file.

But I don't think that I will ever go back to use the package again. Because:


    - the package use 'px'. So, the resized image is not responsive. They will have a fixed width.

    - resizing doesn't work in the touch screen because the package only works with mouse event!

*/

/*__________________________________________

 ✅ Blot
____________________________________________*/


// iframe-blot (side-effect-only import)
import './custom-blot/iframe-custom-blot'

// image blot (side-effect-only import)
import './custom-blot/cloud-image-custom-blot'


/*__________________________________________

 ✅ types 
____________________________________________*/


type type_of_rte_props = {

    quillRef: any

    rte_initial_state: type_of_rte_state

    rte_state: type_of_rte_state

    update_rte_state: type_of_update_rte_state

    display_these_toolbar_options: type_of_display_these_toolbar_options

    customizeUI: customizeUiType,

    imageValidation: imageValidationType
}


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function QUILL_RTE___COMPONENT(props: type_of_rte_props) {

    // 🍪 props
    const {
        quillRef,
        rte_initial_state,
        rte_state,
        update_rte_state,
        display_these_toolbar_options,
        customizeUI,
        imageValidation,
    } = props




    /* 🔖 We will use the following 'quillEditorRef ' in a <Box/> component.
        
        When the component is rendered, the quillEditorRef  hook will hold a reference to the DOM node of the <Box> component, allowing the Quill editor to be initialized and rendered inside it. This approach is necessary because quill requires a DOM node to be passed as the container for the editor.
    */

    // 🍪 quill editor's reference
    const quillEditorRef = useRef(null);




    /* 🍪 When the component first mounts, setting up the Quill editor and performing various tasks, such as setting up different modules & theme */
    useMount(() => {

        quillRef.current = new Quill(quillEditorRef.current, {

            modules: {

                /* 🔖 
                    - I don't need the default toolbar but if make the toolbar false, then tooltip for the inserted link will not work. 
                    
                    - So, setting the value of the toolbar to true but in the css, we are using .ql-toolbar{display:none} to hide the toolbar. 

                
                     💡 If I ever  make the tooltip for inserted link, I should make the toolbar false. But I don't have any plan to make a tooltip as of Sep 23, 2023. Reason:

                      I was thinking that the toolbar:true isn't doing much but contributing significantly in the bundle size.

                      So, I modified the toolbar's link component. Whenever a user would touch a text with link inserted on the editor, the link button on toolbar would have a "edit" badge (Just like the format media toolbar button).

                      Then when the user will click the link button in the toolbar, the same modal which was used to insert the link, will be used again to edit the link.

                      I did 80% of the work. 

                      But still I didn't like this approach of editing the link. The default tooltip approach for editing link is cooler and google docs does the same.

                      So, I thought about testing the actual impact of toolbar: false vs toolbar: true.

                      In the version 0.4.1 & 0.4.2, I did the test.

                      I didn't see any change in the bundle size. 

                      So, I planned to stick with the default tooltip and this "toolbar:true" approach. 
                */
                toolbar: true,


                syntax: {
                    highlight: (code) => {
                        return hljs.highlightAuto(code).value 
                    }
                },


                /*🔖 limitation of 'history' module: It may not track image properly. 

                    It can property track insertion, deletion, or formatting of text. But it doesn't handle changes such as the insertion or removal of custom blot like images. So, redoing may not bring back image. 

                */

                history: {

                    /* 🔖  Specifies the number of milliseconds to wait before a change to the editor's contents is added to the undo/redo history stack. This is useful for batching together multiple changes that occur within a short period of time, such as when the user types quickly. The default value is `1000` (1 second).*/
                    delay: 500,

                    /*🔖 Specifies the maximum number of changes to keep in the undo/redo history stack. Once the stack reaches this limit, older changes will be discarded to make room for newer ones. The default value is `100`. */
                    maxStack: 200,


                    /* 🔖 When `userOnly` is set to `true` in the Quill editor's `history` options, only changes made by the user, such as typing or pasting text, will be tracked in the undo/redo history stack. This means that any programmatic changes made to the editor's contents, such as applying or removing formatting programmatically, will not be tracked in the history and cannot be undone or redone using the `history.undo()` or `history.redo()` method.
 
                    To enable tracking of programmatic changes in the undo/redo history stack, you should set `userOnly` to `false` in the `history` options*/
                    userOnly: false

                },


            },


            // 🔖 I may remove this in future after testing because I am not importing any theme css from quill
            theme: 'snow'
        })


    })




    //🍪 updating 'rte_state.editor_cursor' state
    useMount(() => {


        const update_cursor_position_on_selection_change = (range, oldRange, source) => {

            if (range) {

                update_rte_state(draft => {
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


            update_rte_state(draft => {
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


    })



    //🍪 updating 'draft.editor_events_state.text_change' state on mount
    useMount(() => {

        const track_text_change = () => {

            update_rte_state(draft => {
                draft.editor_events_state.text_change = nanoid(8)
            })
        }

        quillRef.current.on('text-change', track_text_change);

        return () => {
            quillRef.current.off('text-change', track_text_change);
        }

    })



    //🍪 updating 'draft.editor_events_state.selection_change' state on mount
    useMount(() => {

        const track_selection_change = () => {

            update_rte_state(draft => {
                draft.editor_events_state.selection_change = nanoid(8)
            })
        }

        quillRef.current.on('selection-change', track_selection_change);

        return () => {
            quillRef.current.off('selection-change', track_selection_change);
        }

    })


    //🍪 updating 'draft.editor_events_state.any_change' state on mount
    useMount(() => {

        const track_any_change = () => {

            update_rte_state(draft => {
                draft.editor_events_state.any_change = nanoid(8)
            })
        }

        quillRef.current.on('editor-change', track_any_change);

        return () => {
            quillRef.current.off('editor-change', track_any_change)
        }

    })



    //🍪 updating 'rte_state.editor_status' state
    useUpdateEffect(() => {

        function count_total_words(htmlString) {
            // Creating a new DOM Parser
            const parser = new DOMParser();

            // Parsing the html string
            const doc = parser.parseFromString(htmlString, 'text/html');

            // Using textContent to get the text of the parsed HTML and split it into words
            const words = doc.body.textContent.split(/\s+/g);

            // Filter out any empty strings that may result from the split
            const filteredWords = words.filter(word => word.length > 0);

            // Returning the count of words
            return filteredWords.length;
        }



        function count_total_characters(htmlString) {

            // Creating a new DOM Parser
            const parser = new DOMParser();

            // Parsing the html string
            const doc = parser.parseFromString(htmlString, 'text/html');

            // Using textContent to get the text of the parsed HTML and getting its length
            const characterCount = doc.body.textContent.length;

            // Returning the count of characters
            return characterCount;
        }


        function count_total_characters_without_spacing(htmlString) {

            // Creating a new DOM Parser
            const parser = new DOMParser();

            // Parsing the html string
            const doc = parser.parseFromString(htmlString, 'text/html');

            // Using textContent to get the text of the parsed HTML and replacing all spaces with nothing
            const characterCount = doc.body.textContent.replace(/\s/g, '').length;

            // Returning the count of characters
            return characterCount;
        }



        update_rte_state(draft => {
            draft.editor_status.has_focus = quillRef.current.hasFocus()

            draft.editor_status.total_words = count_total_words(rte_state.quill_generated_html)

            draft.editor_status.total_characters = count_total_characters(rte_state.quill_generated_html)

            draft.editor_status.total_characters_excluding_spacing = count_total_characters_without_spacing(rte_state.quill_generated_html)
        })


    }, [rte_state.quill_generated_html, rte_state.editor_events_state.any_change])



    //🍪 updating 'rte_state.quill_generated_html' state
    useUpdateEffect(() => {

        update_rte_state(draft => {
            draft.quill_generated_html = quillRef.current.root.innerHTML
        })


    }, [rte_state.editor_events_state.any_change])




    /* 🍪 updating image related properties of 'rte_state.editor_events_state' */
    const previous_html: any = useRef()

    useUpdateEffect(() => {


        /* 🔖 In the code of this effect, why are we using DomParser instead of regex?

  
            - **Accuracy**: DOMParser understands HTML syntax, making it more accurate than regex.

            - **Safety**: DOMParser doesn't carry the same risks of security issues such as XSS attacks as regex does.

            - **Ease of Use**: The DOMParser API is easier to read, write, and maintain compared to complex regex patterns.

            - **Performance**: For complex tasks, DOMParser could potentially perform better than regex as it parses HTML in one pass.
        */


        // 🥔 Dom Parser

        const parser = new DOMParser();

        const previous_doc = previous_html.current ? parser.parseFromString(previous_html.current, "text/html") : document.implementation.createHTMLDocument("");

        const current_doc = rte_state.quill_generated_html ? parser.parseFromString(rte_state.quill_generated_html, "text/html") : document.implementation.createHTMLDocument("");


        // 🥔 previous images

        const previous_images = previous_doc.querySelectorAll('img')

        const previous_images_with_url_src = Array.from(previous_images).filter(img => img.src.startsWith('http'))

        const previous_images_with_blob_src = Array.from(previous_images).filter(img => img.src.startsWith('blob'));

        const total_previous_images = previous_images.length

        const total_previous_images_with_url_src = previous_images_with_url_src.length

        const total_previous_images_with_blob_src = previous_images_with_blob_src.length;



        // 🥔 current images

        const current_images = current_doc.querySelectorAll('img')

        const current_images_with_url_src = Array.from(current_images).filter(img => img.src.startsWith('http'))

        const current_images_with_blob_src = Array.from(current_images).filter(img => img.src.startsWith('blob'))

        const total_current_images = current_images.length

        const total_current_images_with_url_src = current_images_with_url_src.length

        const total_current_images_with_blob_src = current_images_with_blob_src.length;




        // 🥔 booleans

        const image_has_been_inserted = total_current_images > total_previous_images

        const image_with_url_src_has_been_inserted = total_current_images_with_url_src > total_previous_images_with_url_src

        const image_with_blob_src_has_been_inserted = total_current_images_with_blob_src > total_previous_images_with_blob_src

        const image_has_been_removed = total_previous_images > total_current_images

        const image_with_url_src_has_been_removed = total_previous_images_with_url_src > total_current_images_with_url_src


        const image_with_blob_src_has_been_removed = total_previous_images_with_blob_src > total_current_images_with_blob_src




        // 🥔image related properties of 'rte_state.editor_events_state' 

        function update_editor_events_state_of_rte_state() {

            if (image_has_been_inserted) {

                update_rte_state(draft => {
                    draft.editor_events_state.image_inserted = nanoid(8)
                })



                if (image_with_url_src_has_been_inserted) {

                    update_rte_state(draft => {
                        draft.editor_events_state.image_with_url_src_inserted = nanoid(8)
                    })
                }

                else if (image_with_blob_src_has_been_inserted) {

                    update_rte_state(draft => {
                        draft.editor_events_state.image_with_blob_src_inserted = nanoid(8)
                    })
                }
            }


            else if (image_has_been_removed) {

                update_rte_state(draft => {
                    draft.editor_events_state.image_removed = nanoid(8)
                })


                if (image_with_url_src_has_been_removed) {

                    update_rte_state(draft => {
                        draft.editor_events_state.image_with_url_src_removed = nanoid(8)
                    })
                }



                else if (image_with_blob_src_has_been_removed) {

                    update_rte_state(draft => {
                        draft.editor_events_state.image_with_blob_src_removed = nanoid(8)
                    })
                }

            }

        }



        // 🥔 update_editor_events_state_of_rte_state 
        update_editor_events_state_of_rte_state()



        // 🥔 set previous
        previous_html.current = rte_state.quill_generated_html


    }, [rte_state.quill_generated_html])



    //🍪 updating 'rte_state.images.all_inserted_blob_src_image_info' state
    useUpdateEffect(() => {


        async function extract_blob_images(html: string): Promise<{ img_file: File, img_id: string }[]> {

            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(html, 'text/html');
            let imgElements = htmlDoc.querySelectorAll('img');
            let imageInfoArray = [];

            for (let imgElement of Array.from(imgElements)) {
                let imgSrc = imgElement.getAttribute('src') || '';
                let imgId = imgElement.getAttribute('data-image-id') || '';

                if (imgSrc.startsWith('blob:')) {
                    let blobData = await (await fetch(imgSrc)).blob();
                    let file = new File([blobData], imgId, { type: "image/*" });
                    imageInfoArray.push({ img_file: file, img_id: imgId });
                }
            }

            return imageInfoArray
        }


        // Async function to get image info
        async function get_image_info_and_update_state() {

            try {
                let imageInfoArray = await extract_blob_images(rte_state.quill_generated_html);

                // Now update your state with imageInfoArray
                update_rte_state(draft => {
                    draft.images.all_inserted_blob_src_image_info = imageInfoArray;
                })
            }

            catch (error) {
                // console.error(error);
                return
            }
        }


        // Call the function
        get_image_info_and_update_state()


    }, [rte_state.editor_events_state.image_with_blob_src_inserted, rte_state.editor_events_state.image_with_blob_src_removed])




    //🍪 updating 'rte_state.images.all_removed_url_src_image_id' state
    useUpdateEffect(() => {

        // 🥔 find_missing_image_ids util
        function find_missing_image_ids(payload: { old_html: string, new_html: string }): string[] {


            // Destructure the payload to get old_html and new_html
            const { old_html, new_html } = payload


            //🍪 Use DOMParser to convert the strings into DOMs
            const parser = new DOMParser()
            const old_dom = parser.parseFromString(old_html, 'text/html')
            const new_dom = parser.parseFromString(new_html, 'text/html')


            //🍪 Get the data-image-id values from the old DOM's <img /> tags that do not have a 'blob:' src
            const old_image_ids = new Set(
                Array.from(
                    old_dom.querySelectorAll('img:not([src^="blob:"])[data-image-id]')
                )
                    .map(img => img.getAttribute('data-image-id') as string)
            )


            // Get the list of data-image-id values from the new DOM's <img /> tags, excluding images with 'blob:' sources
            const new_image_ids = new Set(
                Array.from(
                    new_dom.querySelectorAll('img:not([src^="blob:"])[data-image-id]')
                )
                    .map(img => img.getAttribute('data-image-id') as string)
            )


            /*🔖 In the above, utilizing Set over Array for storing image IDs. Reason:

                1. Efficiency: The 'has()' method of Set offers average O(1) time complexity for lookups, ensuring faster checks compared to array's 'includes()' method.

                2. Uniqueness: Sets automatically ensure all elements are distinct, negating the need for manual duplicate checks.
            */


            // Create an array to hold missing image ids
            const missing_ids: string[] = []


            // Check each old data-image-id to see if it exists in the new data-image-ids using for...of
            for (const id of old_image_ids) {
                if (!new_image_ids.has(id)) {
                    missing_ids.push(id)
                }
            }


            // Return the missing ids
            return missing_ids
        }


        // 🥔 ids_of_removed_images
        const ids_of_removed_images = find_missing_image_ids({
            old_html: rte_state.quill_generated_html_fetched_from_database,

            new_html: rte_state.quill_generated_html
        })


        // 🥔 update the state
        update_rte_state(draft => {
            draft.images.all_removed_url_src_image_id = ids_of_removed_images
        })





        /*🔖 This effect only works when an user edit the note. */


    }, [rte_state.editor_events_state.image_with_url_src_inserted, rte_state.editor_events_state.image_with_url_src_removed])








    // ✅ TSX 
    return (

        <Box>


            {/* 🍪 Toolbar 🍪 

                making the toolbar sticky at top when we scroll down     
            */}

            <Box sx={customizeUI.stickyToolbarOnScroll ? { position: 'sticky', top: 0, zIndex: 999 } : {}}>

                <TOOLBAR___COMPONENT
                    quillRef={quillRef}
                    display_these_toolbar_options={display_these_toolbar_options}

                    rte_initial_state={rte_initial_state}
                    rte_state={rte_state}
                    update_rte_state={update_rte_state}
                    imageValidation={imageValidation}
                    defaultVisibleToolbarOptions={customizeUI.defaultVisibleToolbarOptions}
                    dividerInToolbar={customizeUI.dividerInToolbar}
                />

            </Box>



            {/* 🍪 Editor 🍪 */}
            <CSS_FOR_QUILL___STYLED
                using_it_for='editor'
            >

                <Box ref={quillEditorRef}>
                </Box>

            </CSS_FOR_QUILL___STYLED>


        </Box>

    )
}















