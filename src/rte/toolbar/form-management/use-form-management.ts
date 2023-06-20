import { useImmer } from "use-immer";
import { form_empty_field_func } from "./form-empty-field-func";




/*__________________________________________

 ✅ types 
____________________________________________*/


export type type_of_form_configuration = {

    [key: string]:

    /* 🥪 component type - input or password 🥪 */
    {

        component_type: 'input' | 'password'

        value: string

        additionally_tracking?: never

        is_required: boolean

        validation?: {
            is_validating: boolean
            match_pattern?: RegExp
            match_this_field?: string
            error_message?: string | (() => string)

            accepted_file_formats?: never
            accepted_maximum_file_size?: never
            accepted_total_files?: never
        }



    } |


    /* 🥪 component type - checkbox or radio 🥪 */
    {

        component_type: 'checkbox'

        value: boolean

        additionally_tracking?: never

        is_required: boolean

        validation?: never

    } |


    /* 🥪 component type - checkbox group 🥪 */
    {

        component_type: 'checkbox_group'

        value: string[]

        additionally_tracking?: never

        is_required: boolean

        validation?: never

    } |


    /* 🥪 component type - radio 🥪 */
    {

        component_type: 'radio'

        value: string

        additionally_tracking?: never

        is_required: boolean

        validation?: never


    } |

    /* 🥪 component type - image 🥪 */

    {
        component_type: 'image'

        value: string

        additionally_tracking?: {
            preview_link: string[]
            all_uploaded_images_info?: never
            all_removed_images_link?: never
        }

        is_required: boolean

        validation?: {
            is_validating: boolean
            accepted_file_formats?: string[]
            accepted_maximum_file_size?: number
            error_message?: string | (() => string)

            accepted_total_files?: never
            match_pattern?: never
            match_this_field?: never
        }



    } |

    /* 🥪 component type - images 🥪 */

    {
        component_type: 'images'

        value: any[]

        additionally_tracking?: {
            preview_link?: string[]
            all_uploaded_images_info?: never
            all_removed_images_link?: never
        }

        is_required: boolean

        validation?: {
            is_validating: boolean
            accepted_file_formats?: string[]
            accepted_maximum_file_size?: number
            accepted_total_files?: number
            error_message?: string | (() => string)

            match_pattern?: never
            match_this_field?: never
        }


    } |

    /* 🥪 component type - wysiwyg 🥪 */

    {
        component_type: 'wysiwyg'

        value: string

        additionally_tracking?: {
            preview_link?: never
            all_uploaded_images_info?: type_of_obj_with_any_values[]
            all_removed_images_link?: string[]
        }

        is_required: boolean

        validation?: never


    }



}













/*__________________________________________

 ✅ Hook 
____________________________________________*/

export default function FORM_MANAGEMENT___HOOK(form_configuration: type_of_form_configuration) {


    // 🍪 generate_initial_state_and_validation_info 🍪
    const [initial_state, validation_info] = generate_initial_state_and_validation_info(form_configuration)


    // 🍪 useImmer 🍪
    const [formState, updateFormState] = useImmer(initial_state);


    // 🍪 form_actions 🍪
    const actions = form_actions(initial_state, updateFormState);


    // 🍪 validation_before_form_submission_func 🍪
    const { validation_before_form_submission_func } = parent_func_of_validation_before_form_submission_func({
        state: formState,
        actions: actions,
        validation_info: validation_info
    })



    // 🍪 return  🍪
    return {
        formState,
        updateFormState,
        actions,
        validation_info,
        validation_before_form_submission_func
    }
}






// 🍪 generate_initial_state_and_validation_info 🍪
function generate_initial_state_and_validation_info(form_configuration: type_of_form_configuration) {

    /* 🍪 Defining 1st object which we will return 🍪  */
    let initial_state = {

        // We must define the following nested objects here because, after looping through the form_configuration object, we will populate these objects. We must not create the following properties inside the loop. If we do, the following objects will be re-created for every iteration and will lose the previous iteration data.
        form_data: {} as type_of_obj_with_any_values,
        required_field_error: {} as type_of_obj_with_any_values,
        validation_error: {} as type_of_obj_with_any_values,
        resetting_the_form: false,
    }


    /* 🍪 Defining 2nd object which we will return 🍪  */
    let validation_info = {} as type_of_obj_with_any_values





    /* 🍪 Looping the 'form_configuration' object parameter 🍪  */
    for (
        const [property_name, property_value] of Object.entries(form_configuration)
    ) {


        /* 🍔 initial_state object 🍔 */


        /* 🍗 each initial_state.form_data[property_name] is an object, so we must define that before we try to access it  */
        initial_state.form_data[property_name] = {}



        /* 🍗 initial_state.form_data[property_name].value  */
        initial_state.form_data[property_name].value = property_value.value



        /* 🍗 initial_state.form_data[property_name].additionally_tracking (optional) */
        if (property_value?.hasOwnProperty('additionally_tracking')) {

            initial_state.form_data[property_name].additionally_tracking = property_value.additionally_tracking
        }


        /* 🍗 initial_state.required_field_error[property_name]  */
        initial_state.required_field_error[property_name] = false


        /* 🍗 initial_state.required_field_error[property_name]  */
        initial_state.validation_error[property_name] = false



        /* 🍔 validation_info object 🍔 */


        /* 🍗 each validation_info[property_name] is an object & each validation_info[property_name].validation is an object, so we must define that before we try to access it  */
        validation_info[property_name] = { validation: {} }


        /* 🍗 validation_info[property_name].is_required  */
        if (property_value?.hasOwnProperty('is_required')) {
            validation_info[property_name].is_required = property_value.is_required
        }
        else {
            validation_info[property_name].is_required = false
        }



        /* 🍗 validation_info[property_name].validation.is_validating  */
        if (property_value.validation?.hasOwnProperty('is_validating')) {
            validation_info[property_name].validation.is_validating = property_value.validation?.is_validating
        }
        else {
            validation_info[property_name].validation.is_validating = false
        }


        /* 🍗 validation_info[property_name].validation?.match_pattern (optional) */
        if (property_value.validation?.match_pattern) {
            validation_info[property_name].validation.match_pattern = property_value.validation?.match_pattern
        }


        /* 🍗 validation_info[property_name].validation?.match_this_field (optional) */
        if (property_value.validation?.match_this_field) {
            validation_info[property_name].validation.match_this_field = property_value.validation?.match_this_field
        }



        /* 🍗 validation_info[property_name].validation?.accepted_file_formats (optional) */

        if (property_value.validation?.accepted_file_formats) {
            validation_info[property_name].validation.accepted_file_formats = property_value.validation?.accepted_file_formats
        }


        /* 🍗 validation_info[property_name].validation?.accepted_maximum_file_size (optional) */

        if (property_value.validation?.accepted_maximum_file_size) {
            validation_info[property_name].validation.accepted_maximum_file_size = property_value.validation?.accepted_maximum_file_size
        }


        /* 🍗 validation_info[property_name].validation?.accepted_total_files (optional) */
        if (property_value.validation?.accepted_total_files) {
            validation_info[property_name].validation.accepted_total_files = property_value.validation?.accepted_total_files
        }








        /* 🍗 validation_info[property_name].validation?.error_message (optional) */
        if (property_value.validation?.error_message) {
            validation_info[property_name].validation.error_message = property_value.validation?.error_message
        }



    }


    return [initial_state, validation_info]

}


// 🍪 form_actions 🍪
function form_actions(initialState, updateState) {


    /* remove image related actions.. remove reset form.. instead of that, use form is submitted succssfully action, and it will get trigger on all teh sub component to clear that sub component's input field,, work same as reset but with more control */

    return {

        //By having a single payload object parameter instead of multiple individual parameters, it can make your code more readable, extensible, and easier to maintain.  useReducer also does it
        //Additionally, it can help avoid mistakes related to parameter order 
        update_input_value: (payload) => {
            updateState(draft => {
                draft.form_data[payload.input_name].value = payload.value;
            });
        },

        update_image_value: (payload) => {
            updateState(draft => {
                draft.form_data[payload.input_name].value = payload.new_value

                draft.form_data[payload.input_name].additionally_tracking.preview_link = payload.new_preview_link
            });
        },
        remove_image: (payload) => {
            updateState(draft => {
                draft.form_data[payload.input_name].value = initialState.form_data[payload.input_name].value

                draft.form_data[payload.input_name].additionally_tracking.preview_link = payload.new_value = initialState.form_data[payload.input_name].additionally_tracking.preview_link
            });
        },

        required_field_error: (payload) => {
            updateState(draft => {
                draft.required_field_error[payload.input_name] = true;
            });
        },
        no_required_field_error: (payload) => {
            updateState(draft => {
                draft.required_field_error[payload.input_name] = false;
            });
        },

        validation_error: (payload) => {
            updateState(draft => {
                draft.validation_error[payload.input_name] = true;
            });
        },
        no_validation_error: (payload) => {
            updateState(draft => {
                draft.validation_error[payload.input_name] = false;
            });
        },

        reset_form: () => {

            updateState(draft => {

                draft.form_data = initialState.form_data

                draft.required_field_error = initialState.required_field_error

                draft.validation_error = initialState.validation_error

                // resetting_the_form will only get updated in this place, no where else! sometime simply resetting doesn't work. for example, to clean quill editor, we need to take extra step and the following 'resetting_the_form' property will help trigger that'
                draft.resetting_the_form = !draft.resetting_the_form
            })

        },
    };
}



// 🍪 parent_func_of_validation_before_form_submission_func 🍪
function parent_func_of_validation_before_form_submission_func(payload) {

    // parameters, destructuring
    const { state, actions, validation_info } = payload



    function validation_before_form_submission_func() {


        let any_error = false


        /* 🍔🍔 required field validation 🍔🍔 */


        let any_required_field_error = false;

        /*looping over all the fields to check that any of the field is required or not. If any of the field is required, checking that field is filled or not */

        for (
            const [property_name, property_value] of Object.entries(validation_info)
        ) {


            if (validation_info[property_name].is_required === true) {


                if (form_empty_field_func(state.form_data[property_name].value)) {

                    // required field error
                    actions.required_field_error({ input_name: property_name })

                    any_required_field_error = true

                }


            }

        }






        /* 🍔🍔 checking if there is any 'match_this_field' validation  error 🍔🍔 */



        let any_match_value_error = false;

        for (
            const [property_name, property_value] of Object.entries(validation_info)
        ) {


            if (validation_info[property_name].validation &&
                validation_info[property_name].validation?.match_this_field
            ) {
                if (state.form_data[property_name].value !== state.form_data[validation_info[property_name].validation?.match_this_field].value) {

                    // validation field error
                    actions.validation_error({ input_name: property_name })

                    any_match_value_error = true

                }

                else {

                    // no validation field error
                    actions.no_validation_error({ input_name: property_name })

                    any_match_value_error = false

                }


            }

        }



        /* 🍔🍔 non empty field's input validation 🍔🍔 */

        let input_validation_error_of_any_non_empty_field = false;

        /* looping 'state.validation_error' object  */
        for (
            const [property_name, property_value] of Object.entries(state.validation_error)
        ) {

            // non empty
            if (!form_empty_field_func(state.form_data[property_name].value)) {

                if (property_value === true) {
                    input_validation_error_of_any_non_empty_field = true
                }

            }
        }




        /* 🍔🍔 any_error? 🍔🍔 */

        if (any_required_field_error ||
            any_match_value_error || input_validation_error_of_any_non_empty_field
        ) {

            any_error = true
        }



        return any_error

    }


    return {
        validation_before_form_submission_func
    }
}


