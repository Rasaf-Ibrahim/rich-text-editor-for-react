/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'

// hook
import { useImmer } from "use-immer"
import { useUpdateEffect } from "react-use"


// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library'


// form management
import FORM_MANAGEMENT___HOOK, { type_of_form_configuration } from "../form-management/use-form-management"


// icon
import { ImageRounded } from '../mui/icons';

// styled components
import {
    MODAL_WRAPPER_OF_CONTENT___STYLED,
    WRAPPER_OF_FORM___STYLED,
    WRAPPER_OF_FORM_CONTENT___STYLED
} from "../styled-components/styled-components";


// mui components
import {
    Button,
    IconButton,
    FormControl,
    Tooltip,
    Box,
    Typography,
} from '../mui/components'


// reusable components
import FORM_IMAGE___REUSABLE from "../reusable-components/form-image/form-image";
import MODAL___REUSABLE from '../reusable-components/modal'
import MODAL_CLOSE_BUTTON___REUSABLE from '../reusable-components/modal-close-button'





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function IMAGE_BASE64___COMPONENT(props: type_of_toolbar_option_component_props) {


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


            <MODAL___REUSABLE

                modal_is_open={image_state.open_image_insert_modal}

                user_can_close_the_modal={true}

                handle_close_modal={handle_close_modal}

                modal_content_jsx={

                    <MODAL_WRAPPER_OF_CONTENT___STYLED>

                        <WRAPPER_OF_FORM___STYLED>

                            <WRAPPER_OF_FORM_CONTENT___STYLED onSubmit={handleSubmit}>


                                <FORM_IMAGE___REUSABLE

                                    label='Image'

                                    input_name='selected_image'

                                    state={formState}

                                    actions={actions}

                                    validation_info={validation_info}

                                />


                                <Button type="submit" variant='contained'>Submit</Button>


                            </WRAPPER_OF_FORM_CONTENT___STYLED>

                        </WRAPPER_OF_FORM___STYLED>

                    </MODAL_WRAPPER_OF_CONTENT___STYLED>
                }


                modal_navbar_jsx={

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>

                        <ImageRounded sx={{ fontSize: '1.3rem' }} />

                        <Typography sx={{
                            typography: 'body1', textAlign: 'center',
                            fontWeight: 600
                        }}>
                            Insert Base64 Image
                        </Typography>

                    </Box>
                }



                modal_footer_jsx={

                    <MODAL_CLOSE_BUTTON___REUSABLE handle_modal_close={handle_close_modal} />

                }

            />


        </>
    )
}



