/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'

// hook
import { useImmer } from "use-immer"
import { useMount, useUpdateEffect } from "react-use"


// api
import { useUploadImage } from "../api-calls/use-upload-image";


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
import LOADING_SPINNER___REUSABLE from "../reusable-components/loading-spinner";





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

export default function IMAGE_CLOUDINARY___COMPONENT(props: type_of_image_cloudinary_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props




    const initial_state = {
        open_image_insert_modal: false,

        trigger_quill_to_insert_the_image: false,

        currently_inserting_the_image: false,
    }


    const [image_state, update_image_state] = useImmer(initial_state)



    const handle_click_on_the_image_button = () => {

        update_image_state(draft => {
            draft.open_image_insert_modal = true
        })
    }



    // code to track the time of fetching the image after uploading it
    useMount(() => {

        quillRef.current.on('text-change', function (delta, oldDelta, source) {
            if (delta.ops) {
                delta.ops.forEach(op => {
                    if (op.insert && typeof op.insert === 'object' && op.insert.image) {

                        update_image_state(draft => {
                            draft.currently_inserting_the_image = true
                        })

                        const imageElement = new Image();
                        imageElement.src = op.insert.image;


                        imageElement.onload = () => {
                            update_image_state(draft => {
                                draft.currently_inserting_the_image = false

                                draft.open_image_insert_modal = false
                            })
                        }
                    }
                })
            }


        })

    })



    // inserting image on the editor after successfully uploading and fetching  it
    useUpdateEffect(() => {

        if (quillRef.current) {

            if (wysiwyg_state.editor_cursor.position !== '') {

                const range = quillRef.current.getSelection(true);

                quillRef.current.clipboard.dangerouslyPasteHTML(
                    wysiwyg_state.editor_cursor.position,

                    // when we insert an image, initially the image's width would be 250px
                    `<img width="250" src="${wysiwyg_state.images.last_uploaded_image_link}">`
                )

                quillRef.current.setSelection(range.index + 1);
            }
        }


        update_wysiwyg_state(draft => {

            draft.images.last_uploaded_image_link = ''
        })

    }, [image_state.trigger_quill_to_insert_the_image])



    return (

        <>
            <Tooltip title="Image (Cloudinary)" placement="top">
                <FormControl margin='dense'>
                    <IconButton onClick={handle_click_on_the_image_button}>
                        <ImageRounded sx={(theme) => ({
                            fontSize: '1.2rem',
                        })} />
                    </IconButton>
                </FormControl>
            </Tooltip>


            <INSERT_IMAGE___SECTION wysiwyg_state={wysiwyg_state} update_wysiwyg_state={update_wysiwyg_state} image_state={image_state} update_image_state={update_image_state} />

        </>
    )
}





/*__________________________________________

 ✅ Section of 
 <IMAGE_CLOUDINARY___COMPONENT/>
____________________________________________*/


const INSERT_IMAGE___SECTION = ({ update_wysiwyg_state, wysiwyg_state, image_state, update_image_state }) => {



    //  handle_close_modal
    const handle_close_modal = () => {

        update_image_state(draft => {
            draft.open_image_insert_modal = false
        })
    }




    return (
        <>

            <Modal
                open={image_state.open_image_insert_modal}
                onClose={handle_close_modal}
            >


                <MODAL_CONTENT___STYLED>

                    <UPLOAD_IMAGE___SECTION update_wysiwyg_state={update_wysiwyg_state} wysiwyg_state={wysiwyg_state} image_state={image_state} update_image_state={update_image_state}
                    />

                </MODAL_CONTENT___STYLED>


            </Modal>


        </>
    )
}




// 🥪


const UPLOAD_IMAGE___SECTION = ({ update_wysiwyg_state, wysiwyg_state, image_state, update_image_state }) => {


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


        },
    }


    // 🍪 form state management (2/2 Steps) - FORM_MANAGEMENT___HOOK 🍪
    const {
        formState,
        updateFormState,
        actions,
        validation_info,
        validation_before_form_submission_func

    } = FORM_MANAGEMENT___HOOK(form_configuration)




    // 🍪 hook related to API request 🍪
    const { uploadImage, status, data, error } = useUploadImage();

    // logging response
    // useLogger('status', status, 'data', data, 'error', error)



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


        // 🍔🍔 API request - upload the image 🍔🍔

        const formData: type_of_anything = new FormData();

        formData.append('image', formState.form_data.selected_image.value);

        formData.append('user_id', '07')

        uploadImage(formData);


        /* 🍔🍔 reset the form  🍔🍔*/
        actions.reset_form()
    }






    // if image successfully uploads, we need to update multiple values of 'wysiwyg_state' state
    useUpdateEffect(() => {

        if (status === 'success' && data) {


            update_image_state(draft => {

                draft.trigger_quill_to_insert_the_image = !draft.trigger_quill_to_insert_the_image
            })

            update_wysiwyg_state(draft => {


                // then changing other states
                draft.images.all_uploaded_images_info.push(data.data.created_document)

                draft.images.all_uploaded_images_link.push(data.data.created_document.image_link)

                draft.images.last_uploaded_image_link = data.data.created_document.image_link

            })


        }

    }, [data])



    return (

        <WRAPPER_OF_FORM___STYLED>

            <WRAPPER_OF_FORM_CONTENT___STYLED onSubmit={handleSubmit}>


                {(() => {

                    if (status === 'idle') return (
                        <>
                            <FORM_IMAGE___REUSABLE

                                label='Image'

                                input_name='selected_image'

                                state={formState}

                                update_state={updateFormState}

                                actions={actions}

                                validation_info={validation_info}

                            />


                            <Button type="submit" variant='contained' disabled={status === 'loading' as type_of_anything}>Submit</Button>

                        </>
                    )

                    else {

                        return (


                            <>


                                <LOADING_SPINNER___REUSABLE full_screen={false} margin='2rem' />


                                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                                    {(() => {
                                        if (status === 'loading') return 'Uploading the image..'

                                        else if (image_state.currently_inserting_the_image) return 'Fetching and inserting the image'
                                    })()}
                                </Typography>


                            </>



                        )


                    }


                })()}




            </WRAPPER_OF_FORM_CONTENT___STYLED>

        </WRAPPER_OF_FORM___STYLED>
    )
}





