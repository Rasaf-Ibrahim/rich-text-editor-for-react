/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'

// quill
import Quill from 'quill';

// hook
import { useImmer } from "use-immer"
import { useUpdateEffect } from "react-use"

// nonoid
import { nanoid } from 'nanoid';


// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library'


// form management
import useFormManagement, { type_of_form_configuration } from "../form-management/use-form-management"


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
import FORM_IMAGE___REUSABLE from "../form-image/form-image";
import MODAL___REUSABLE from '../reusable-components/modal'
import MODAL_CLOSE_BUTTON___REUSABLE from '../reusable-components/modal-close-button'
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';








/*__________________________________________

 ✅ Creating a new blot: ImageBlot
____________________________________________*/

// importing the Embed class from Quill, which is a base class for blots that represents block-level embedded content
let Embed = Quill.import('blots/embed');



// creating a new class ImageBlot that extends the Embed class
class ImageBlot extends Embed {


    /* defining a static method called 'create'. It takes a value parameter and creates a new node based on the super class's create method. It sets attributes such as src, data-image-id, and width on the node using the provided value. */
    static create(value) {

        let node = super.create(value);

        node.setAttribute('src', value.url);
        node.setAttribute('data-image-id', value.image_id);
        node.setAttribute('width', value.width);

        return node;
    }


    /* the following static method 'value' is used to retrieve the values of url, image_id, and width attributes from a given node. */
    static value(node) {

        return {
            url: node.getAttribute('src'),
            image_id: node.getAttribute('data-image-id'),
            width: node.getAttribute('width')
        }
    }
}


/* setting the name of the blot */
ImageBlot.blotName = 'custom_image';

/* setting the tag name to 'img', this means that the custom blot will be represented by an 'img' tag in the editor's HTML. */
ImageBlot.tagName = 'img';

/* registering the blot */
Quill.register(ImageBlot)



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function IMAGE_CLOUD___COMPONENT(props: type_of_toolbar_option_component_props) {



    // 🫓 props
    const { quillRef, rte_state, update_rte_state, imageValidation } = props


    // 🫓 image_state
    const initial_state = {
        open_image_insert_modal: false,

        trigger_quill_to_insert_the_image: false,

        // the necessity of the following property is discussed in the embed-youtube-video option's component.
        remembering_cursor_position: 0,
    }


    const [image_state, update_image_state] = useImmer(initial_state)


    // 🫓 handle_click_on_the_image_button
    const handle_click_on_the_image_button = () => {

        update_image_state(draft => {
            draft.open_image_insert_modal = true
        })
    }







    /* 🫓 on change of the 'image_state.open_image_insert_modal' state,

        - updating 'image_state.remembering_cursor_position' state
        
    */
    useUpdateEffect(() => {

        // only when the modal is open, we want to update the value
        if (image_state.open_image_insert_modal) {

            update_image_state(draft => {
                draft.remembering_cursor_position = rte_state.editor_cursor.position
            })
        }

    }, [image_state.open_image_insert_modal])



    // 🫓 form state management (1/3 Steps) - form_configuration 
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

                'accepted_file_formats': imageValidation?.acceptableFileFormats ? imageValidation.acceptableFileFormats : ['png', 'jpg', 'jpeg'],

                'accepted_maximum_file_size': imageValidation?.maximumFileSize ? imageValidation.maximumFileSize : 1024, //kb

                error_message: function () {

                    return (

                        `Image must have one of these extensions: ${JSON.stringify(this.accepted_file_formats)}. 
                            
                        Image size must be lower than ${this.accepted_maximum_file_size}kb.`
                    )
                }

            }

        }
    }




    // 🫓 form state management (2/2 Steps) - useFormManagement 
    const {
        formState,
        updateFormState,
        actions,
        validation_info,
        validation_before_form_submission_func

    } = useFormManagement(form_configuration)




    // 🫓 form state management (3/3 Steps) - handleSubmit 
    const handleSubmit = (event) => {

        // 🥔 stop refreshing the page on reload
        event.preventDefault();


        /* 🥔 if 'validation_before_form_submission_func' function returns true, that means there is at least one validation error in the form and we can not submit the form */
        if (validation_before_form_submission_func() === true) return;


        // 🥔 close the modal & trigger quill to insert the image 
        update_image_state(draft => {
            draft.open_image_insert_modal = false

            draft.trigger_quill_to_insert_the_image = !draft.trigger_quill_to_insert_the_image
        })

    }


    // 🫓 handle_close_modal
    const handle_close_modal = () => {

        update_image_state(draft => {
            draft.open_image_insert_modal = false

        })

    }



    /* 🫓  on change of the 'image_state.trigger_quill_to_insert_the_image' state,


      1. inserting image on the editor,

      2. updating the 'rte_state.images' state

      3. updating the 'rte_state.editor_cursor' state

    */
    useUpdateEffect(() => {

        if (quillRef.current) {

            let nano_id = nanoid(12)


            // 🥔 inserting the image in the right position
            quillRef.current.editor.insertEmbed(

                rte_state.editor_cursor.position,

                'custom_image',

                {
                    url: formState.form_data.selected_image.additionally_tracking.preview_link,
                    image_id: nano_id,
                    width: 250
                },

                'user'

            )


            // 🥔 updating the 'rte_state.editor_cursor' state
            update_rte_state(draft => {
                draft.editor_cursor.position = image_state.remembering_cursor_position + 1
            })


            // 🥔  moving the cursor after the embedded image
            quillRef.current.setSelection(image_state.remembering_cursor_position + 1)

        }


    }, [image_state.trigger_quill_to_insert_the_image])




    // ✅ TSX
    return (

        <>
            <Tooltip title="Insert Image" placement="top">

                <FormControl margin='dense'>

                    <IconButton onClick={handle_click_on_the_image_button}>

                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={ImageRounded}
                        />

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

                        {/* This icon is not for the toolbar. So, we are not using "MUI_ICON___REUSABLE"   */}
                        <ImageRounded sx={{ fontSize: '1.3rem' }} />

                        <Typography sx={{
                            typography: 'body1', textAlign: 'center',
                            fontWeight: 600
                        }}>
                            Insert Image
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



