/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'

// hook
import { useImmer } from "use-immer"
import { useMount, useUpdateEffect } from "react-use"



// form management
import FORM_MANAGEMENT___HOOK, { type_of_form_configuration } from "../form-management/use-form-management"


// icon
import ImageRounded from "@mui/icons-material/ImageRounded";


// styled components
import {
    MODAL_CONTENT___STYLED,
    WRAPPER_OF_FORM___STYLED,
    WRAPPER_OF_FORM_CONTENT___STYLED
} from "../styled-components/styled-components";


// mui components
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Modal from '@mui/material/Modal'

import Tooltip from '@mui/material/Tooltip'

import FormControl from '@mui/material/FormControl'


// reusable components
import FORM_IMAGE___REUSABLE from "../reusable-components/form-image";





/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_image_cloudinary_props = {

    quillRef: any
    wysiwyg_state: any
    update_wysiwyg_state: type_of_func_prop_with_no_rule
}




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function IMAGE_BASE64___COMPONENT(props: type_of_image_cloudinary_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    const initial_state = {
        open_image_insert_modal: false,

        trigger_quill_to_insert_the_image: false,



        // the necessity of the following property is discussed in the embed-youtube-video option's component.
        remembering_cursor_position: 0,
    }


    const [image_state, update_image_state] = useImmer(initial_state)



    const handle_click_on_the_image_button = () => {

        update_image_state(draft => {
            draft.open_image_insert_modal = true
        })
    }


    const handle_close_modal = () => {

        update_image_state(draft => {
            draft.open_image_insert_modal = false
        })
    }




    /*
        - updating the value of 'remembering_cursor_position' 'video_state' state
        
        - when 'open_modal' value of the 'video_state' state changes, the following effect occurs
    */
    useUpdateEffect(() => {

        // only when the modal is open, we want to update the value
        if (image_state.open_image_insert_modal) {

            update_image_state(draft => {
                draft.remembering_cursor_position = wysiwyg_state.editor_cursor.position
            })
        }

    }, [image_state.open_image_insert_modal])



    // 🍪 form state management (1/3 Steps) - form_configuration 🍪
    const form_configuration: type_of_form_configuration = {

        selected_image: {

            component_type: 'image',

            value: '',

            additionally_tracking: {
                preview_link: null
            },

            is_required: true,

            validation: {

                is_validating: true,

                'accepted_file_formats': ['png', 'jpg', 'jpeg'],

                'accepted_maximum_file_size': 512,  //kb

                error_message: function () {

                    return (

                        `Image must have one of these extensions: ${JSON.stringify(this.accepted_file_formats)}. 
                            
                        Image size must be lower than ${this.accepted_maximum_file_size}kb.`
                    )
                }

            }



        }
    }


    // 🍪 form state management (2/2 Steps) - FORM_MANAGEMENT___HOOK 🍪
    const {
        formState,
        updateFormState,
        actions,
        validation_info,
        validation_before_form_submission_func

    } = FORM_MANAGEMENT___HOOK(form_configuration)




    // 🍪 form state management (7/7 Steps) - handleSubmit 🍪
    const handleSubmit = (event) => {

        // 🍔🍔 stop refreshing the page on reload 🍔🍔
        event.preventDefault();


        /* 🍔🍔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form🍔🍔 */
        if (validation_before_form_submission_func() === true) return;


        /* 🍔🍔 submit the form's all the inputted data 🍔🍔 */
        console.log('😃 submitting data', {
            ...formState.form_data
        })


        // 🍔🍔 Trigger quill to insert the image 🍔🍔
        update_image_state(draft => {
            draft.open_image_insert_modal = false

            draft.trigger_quill_to_insert_the_image = !draft.trigger_quill_to_insert_the_image
        })


    }




    // inserting image on the editor after successfully uploading and fetching  it
    useUpdateEffect(() => {


        let base64String
        const reader = new FileReader()
        reader.readAsDataURL(formState.form_data.selected_image.value);

        reader.onload = () => {
            base64String = reader.result
            // console.log(base64String)



            // inserting in the right position

            if (quillRef.current) {

                if (wysiwyg_state.editor_cursor.position !== '') {

                    const range = quillRef.current.getSelection(true);

                    quillRef.current.clipboard.dangerouslyPasteHTML(
                        wysiwyg_state.editor_cursor.position,

                        // when we insert an image, initially the image's width would be 250px
                        `<img width="250" 
                         src="${base64String}">`
                    )


                    /* updating the cursor position */
                    update_wysiwyg_state(draft => {
                        draft.editor_cursor.position = image_state.remembering_cursor_position + 1
                    })

                    //  moving the cursor after the embedded video
                    quillRef.current.setSelection(image_state.remembering_cursor_position + 1)
                }
            }


        }



    }, [image_state.trigger_quill_to_insert_the_image])





    return (

        <>
            <Tooltip title="Image (Base64)" placement="top">
                <FormControl margin='dense'>
                    <IconButton onClick={handle_click_on_the_image_button}>
                        <ImageRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />
                    </IconButton>
                </FormControl>
            </Tooltip>




            <Modal
                open={image_state.open_image_insert_modal}
                onClose={handle_close_modal}
            >


                <MODAL_CONTENT___STYLED>

                    <WRAPPER_OF_FORM___STYLED>

                        <WRAPPER_OF_FORM_CONTENT___STYLED onSubmit={handleSubmit}>


                            <FORM_IMAGE___REUSABLE

                                label='Image'

                                input_name='selected_image'

                                state={formState}

                                update_state={updateFormState}

                                actions={actions}

                                validation_info={validation_info}

                            />


                            <Button type="submit" variant='contained'>Submit</Button>


                        </WRAPPER_OF_FORM_CONTENT___STYLED>

                    </WRAPPER_OF_FORM___STYLED>

                </MODAL_CONTENT___STYLED>

            </Modal>

        </>
    )
}



