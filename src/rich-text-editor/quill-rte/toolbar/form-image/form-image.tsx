/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// hook
import { useState, useRef } from "react";
import { useUpdateEffect } from 'react-use';

// utils
import { form_empty_field_func } from "../form-management/form-empty-field-func";

// icon
import PhotoIcon from '@mui/icons-material/Photo';

// selected components
import { WRAPPER_OF_SELECTED_IMAGES___STYLED } from "../styled-components/styled-components"

// components
import { Box, Button, InputLabel, Typography } from '@mui/material'
import SELECTED_IMAGE___REUSABLE from "./_selected-image"
import ERROR_MESSAGE___REUSABLE from "./_error-message";
import { imageValidationType } from '../../../../types/types-for-the-users';



/*__________________________________________

 ✅ types
____________________________________________*/

type types_of_mui_image = {
    label: string
    input_name: string

    state: type_of_obj_with_any_values
    actions: type_of_obj_with_any_values
    validation_info: type_of_obj_with_any_values
}



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function FORM_IMAGE___REUSABLE(props: types_of_mui_image) {


    // 🫓 props 🫓 
    const {
        label,
        input_name,
        state,
        actions,
        validation_info,
    } = props





    // 🫓 state to trigger validation  🫓 
    const [state_trigger_validation, set_state_trigger_validation_check] = useState(false)



    /*🔖 Why do we need useRef?

    - To select an image, we must have a input field.

    - But to make the UI look better, we will hide the input field.

    - Instead of the input field, we will show a button on the UI.

    - We want the input field's functionality on that button so that we can select image by clicking on that button. 

    - But a button can't have the functionality of a input field. Instead what we can do is to trigger the input field when we click on the button. 

    - We are using useRef on the input field to have a reference of the input field.

    - Then, when we are clicking on the button, we are triggering the input field through the reference.
   
   */


    // 🫓input_field_ref 🫓
    const input_field_ref = useRef<type_of_anything>();


    // 🫓 When you click on the button, logically you also click on the input field 🫓
    const handle_logically_click_the_input_on_button_click = () => {

        return input_field_ref.current.click()
    }


    // 🫓 function to execute when input change either on selecting or dropping images
    const execute_this_when_input_changes = (file) => {


        /* 🥔🥔 Updating Input Value 🥔🥔 */
        actions.update_image_value({
            input_name: [input_name],

            new_value: file,

            new_preview_link: (URL as any).createObjectURL(file)
        })


        /* 🥔 Triggering validation check on input change 🥔 */
        set_state_trigger_validation_check(!state_trigger_validation)
    }



    // 🫓 handle input change on selecting an image 🫓
    const handle_input_change_on_selecting_image = (event) => {

        execute_this_when_input_changes(event.target.files[0])

    }


    // 🫓 handle input change on drag & dropping an image 🫓
    const handle_input_change_on_dropping_image = (event) => {

        event.preventDefault();

        execute_this_when_input_changes(event.dataTransfer.files[0])
    }


    // 🫓 handle drag over 🫓
    const handle_drag_over = (event) => {
        event.preventDefault();
    }




    // 🫓 handle delete selected image  🫓
    const handle_delete_selected_image = () => {

        /* 🥔🥔 deleting the image 🥔🥔 */
        actions.remove_image({
            input_name: [input_name]
        })


        /* 🔖 
            This action occurs when a clicks on the "Remove" button.   Both image link and image preview link gets removed upon calling this action. 

            Here, we will not trigger any validation check as the user wanted to remove the image by their wish.

            You may argue that When a user select an image with invalid format, image link also gets removed and we trigger validation check. Then why not we also trigger validation check here?  Because that's actually different a situation. At that time, the user is doing a mistake by selecting wrong format and we should trigger validation check to show the mistake to the user.
        */
    }



    // 🫓 validation function 🫓
    const validation_func = async () => {


        /* 🥔 Required Field Validation 🥔 */
        //  only proceed to required field validation if this field is a required field.

        console.log(validation_info)
        if (validation_info[input_name].is_required) {


            if (form_empty_field_func(state.form_data[input_name].value)) {

                actions.required_field_error({
                    input_name: [input_name],
                })
            }

            else {
                actions.no_required_field_error({
                    input_name: [input_name],
                })

            }

        }



        /* 🥔 input validation  🥔 */
        //  only proceed to validation if we want to validate this field
        if (validation_info[input_name].validation.is_validating) {

            // 🧅 file format error 
            let file_format_error = false


            if (validation_info[input_name].validation.hasOwnProperty('accepted_file_formats')) {

                const accepted_file_formats = validation_info[input_name].validation.accepted_file_formats

                const uploaded_file_formats = state.form_data[input_name]?.value?.name?.split('.')[1]

                if (!accepted_file_formats.includes(uploaded_file_formats)) {

                    file_format_error = true

                }

            }


            // 🧅 file size error 
            let file_size_error = false

            if (validation_info[input_name].validation.hasOwnProperty('accepted_maximum_file_size')) {

                const accepted_maximum_file_size = validation_info[input_name].validation.accepted_maximum_file_size

                const fileSize = Math.round(state.form_data[input_name].value.size / 1024)

                if (fileSize > accepted_maximum_file_size) {

                    file_size_error = true

                }

            }



            // 🧅  Dispatching based on error  
            if (file_format_error || file_size_error) {

                // remove image
                actions.remove_image({
                    input_name: [input_name]
                })


                actions.validation_error({
                    input_name: [input_name]
                })
            }

            // on input change, if there is no invalid image
            else {

                actions.no_validation_error({
                    input_name: [input_name]
                })

            }
        }



        /* ⚠️⚠️⚠️ couldn't make logic to check the selected image's dimension!*/

    }


    // 🫓 executing validation function 🫓
    useUpdateEffect(() => {

        validation_func()

    }, [state_trigger_validation])




    /*__________________________________________

        ✅ JSX
    ____________________________________________*/
    return (

        <Box sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: '1rem'
        })}>


            <InputLabel>{label}</InputLabel>


            <DRAG_OR_SELECT_IMAGE___CHILD
                handle_drag_over={handle_drag_over}
                handle_input_change_on_dropping_image={handle_input_change_on_dropping_image}
                handle_input_change_on_selecting_image={handle_input_change_on_selecting_image}
                input_field_ref={input_field_ref}
                handle_logically_click_the_input_on_button_click={handle_logically_click_the_input_on_button_click}
            />


            <ERROR_MESSAGE___REUSABLE

                has_a_required_field_error={state.required_field_error[input_name] === true}
                has_a_validation_error={state.validation_error[input_name] === true}
                validation_error_message={validation_info[input_name].validation.error_message()}

            />


            <IMAGE_PREVIEW___CHILD
                state={state}
                input_name={input_name}
                handle_delete_selected_image={handle_delete_selected_image}
            />

        </Box>

    )

}






/*__________________________________________

 ✅ Sections of 
 <FORM_IMAGE___REUSABLE/>
____________________________________________*/



/* 🥔 */
function DRAG_OR_SELECT_IMAGE___CHILD({
    handle_drag_over,
    handle_input_change_on_dropping_image,
    handle_input_change_on_selecting_image,
    input_field_ref,
    handle_logically_click_the_input_on_button_click,

}) {

    return (

        <Box
            onDragOver={handle_drag_over}
            onDrop={handle_input_change_on_dropping_image}
            sx={(theme) => ({
                padding: '1rem',
                border: `2px dotted ${theme.palette.divider}`,
                borderRadius: '0.5rem',

                textAlign: 'center',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            })}>

            <PhotoIcon
                sx={(theme) => ({
                    fontSize: '1.8rem',
                    color: theme.palette.primary.light
                })}
            />

            <Typography
                variant='body2'
                color='primary.light'
            >
                Drag & Drop or,
            </Typography>

            <input
                type="file"
                onChange={handle_input_change_on_selecting_image}
                hidden
                ref={input_field_ref}
            />

            <Button
                onClick={handle_logically_click_the_input_on_button_click}
                variant='outlined'
                size='small'
                sx={(theme) => ({
                    color: theme.palette.primary.light,
                    ...theme.typography.body2
                })}
            >
                Select
            </Button>

        </Box>


    )

}






/* 🥔 */
function IMAGE_PREVIEW___CHILD({
    state,
    input_name,
    handle_delete_selected_image

}) {

    return (

        <>
            {!state.validation_error[input_name] && state.form_data[input_name].additionally_tracking.preview_link &&

                <WRAPPER_OF_SELECTED_IMAGES___STYLED>

                    <SELECTED_IMAGE___REUSABLE
                        src={state.form_data[input_name].additionally_tracking.preview_link}
                        handle_click_on_remove_button={() => handle_delete_selected_image()}
                    />

                </WRAPPER_OF_SELECTED_IMAGES___STYLED>


            }

        </>

    )

}