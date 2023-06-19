
/*__________________________________________

 ✅ import
____________________________________________*/

import React from 'react'

// hook
import { useTheme } from '@mui/material/styles';

// react-spinner library
import RingLoader from "react-spinners/RingLoader";
import ScaleLoader from "react-spinners/ScaleLoader";

// components
import { Box } from '@mui/material';



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
export default function LOADING_SPINNER___REUSABLE(props:type_of_loading_spinner_props) {


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

                <FULL_SCREEN_SPINNER___SECTION />
            }


            {!full_screen &&

                <NOT_FULL_SCREEN_SPINNER___SECTION margin={margin} />
            }

        </>
    )

}



/*__________________________________________
 ✅ Sections of <LOADING_SPINNER___COMPONENT/>
____________________________________________*/


/* 🍔 */
const FULL_SCREEN_SPINNER___SECTION = () => {


    // useTheme
    const theme = useTheme()

    return (

        <Box sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        })}>

            <RingLoader
                color={theme.palette.primary.main}
                size={100}
                role="alert"
                aria-label="Loading Spinner"
            />

        </Box>

    )


}



/* 🍔 */
const NOT_FULL_SCREEN_SPINNER___SECTION = ({ margin }) => {


    // useTheme
    const theme = useTheme()

    return (

        <Box sx={(theme) => ({
            margin: { margin },

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        })}>

            <ScaleLoader
                color={theme.palette.primary.main}
                role="alert"
                aria-label="Loading Spinner"
            />

        </Box>

    )

}


