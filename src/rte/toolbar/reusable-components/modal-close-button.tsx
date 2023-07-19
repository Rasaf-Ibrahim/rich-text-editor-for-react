/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'

// mui components
import { Button } from "../mui/components"


/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function MODAL_CLOSE_BUTTON___REUSABLE({ handle_modal_close }) {

    return (

        <Button
            onClick={handle_modal_close}
            size='small'
            variant="outlined">
            Close
        </Button>

    )
}