/* eslint-disable react/function-component-definition */

/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// hook
import { useTheme } from '@mui/material/styles';

// components
import { Box, CircularProgress } from '../mui/components';



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_loading_spinner_props = {

    full_screen: true,
    margin?: undefined
} | {

    full_screen: false,
    margin: string
}




/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function LOADING_SPINNER___REUSABLE(props: type_of_loading_spinner_props) {


    const {
        full_screen,
        margin
    } = props




    /*__________________________________________
    
     ✅ JSX 
    ____________________________________________*/
    return (

        <>

            {full_screen &&

                <FULL_SCREEN_SPINNER___CHILD />
            }


            {!full_screen &&

                <NOT_FULL_SCREEN_SPINNER___CHILD margin={margin} />
            }

        </>
    )

}



/*__________________________________________
 ✅ Sections of <LOADING_SPINNER___COMPONENT/>
____________________________________________*/


/* 🥔 */
function FULL_SCREEN_SPINNER___CHILD() {


    // useTheme
    const theme = useTheme()

    return (

        <Box sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        })}>

            <CircularProgress />

        </Box>

    )


}



/* 🥔 */
function NOT_FULL_SCREEN_SPINNER___CHILD({ margin }) {


    // useTheme
    const theme = useTheme()

    return (

        <Box sx={(theme) => ({
            margin: { margin },

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        })}>

            <CircularProgress />

        </Box>

    )

}


