
/*__________________________________________

 ✅ import 
____________________________________________*/
// react
import React from "react"

// types
import { Theme } from '@mui/material'
import { type_of_mui_icon_component } from "../../../../types/commonly-used-types"

// theme
import { useTheme } from '@mui/material/styles'



/*__________________________________________

✅ types 
____________________________________________*/

type type_of_mui_icon_component_props = {
    ICON_COMPONENT: type_of_mui_icon_component
    condition_to_use_primary_color?: boolean | string
    icon_size?: string
}



/*__________________________________________

✅ Functional Component 
____________________________________________*/
export default function MUI_ICON___REUSABLE(props: type_of_mui_icon_component_props) {


    const {
        ICON_COMPONENT,
        condition_to_use_primary_color,
        icon_size
    } = props


    // theme
    const theme = useTheme()




    return (

        <>

            <ICON_COMPONENT sx={(theme: Theme) => ({

                color: condition_to_use_primary_color ? theme.palette.primary.light : theme.palette.secondary.main,

                fontSize: icon_size ? icon_size : '1.2rem'

            })} />

        </>
    )


}




