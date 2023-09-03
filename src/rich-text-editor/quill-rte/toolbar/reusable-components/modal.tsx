

/*__________________________________________

 ✅ import 
____________________________________________*/

// react
import React from 'react'


// components
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '../mui/components'




/*__________________________________________

✅ types 
____________________________________________*/


type none_conditional_types_of_modal_props = {
    modal_is_open: boolean,
    modal_navbar_jsx: type_of_single_element_jsx,
    modal_content_jsx: type_of_single_element_jsx
}


// the 'handle_close_modal', 'modal_footer_jsx'  should only be present when user_can_close_the_modal is true 

type conditional_types_of_modal_props = {
    user_can_close_the_modal: true,
    handle_close_modal: type_of_func_prop_with_no_rule,
    modal_footer_jsx: type_of_single_element_jsx
} |
{
    user_can_close_the_modal: false,
    handle_close_modal: never,
    modal_footer_jsx: never
}



type type_of_modal_props = none_conditional_types_of_modal_props & conditional_types_of_modal_props






/*__________________________________________

✅ Functional Component 
____________________________________________*/

export default function MODAL___REUSABLE(props: type_of_modal_props) {


    //  🫓 props 
    const {
        modal_is_open,
        user_can_close_the_modal,
        handle_close_modal,
        modal_navbar_jsx,
        modal_content_jsx,
        modal_footer_jsx
    } = props


    //  🫓 do nothing func

    function doNothing() { }






    return (


        <Dialog
            open={modal_is_open}

            onClose={user_can_close_the_modal ? () => handle_close_modal() : () => doNothing()}

            scroll='paper'
        >

            <DialogTitle
                sx={{
                    backgroundColor: 'background.paper',
                    typography: 'h6'
                }}>

                {modal_navbar_jsx}
            </DialogTitle>



            <DialogContent
                sx={{
                    backgroundColor: 'background.default'
                }}>

                {modal_content_jsx}

            </DialogContent>




            {user_can_close_the_modal &&

                <DialogActions
                    sx={{
                        backgroundColor: 'background.paper'
                    }}>

                    {modal_footer_jsx}

                </DialogActions>

            }


        </Dialog>


    )
}