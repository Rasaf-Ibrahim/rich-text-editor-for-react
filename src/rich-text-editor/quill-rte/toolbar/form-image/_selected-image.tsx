/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// mui components
import { Button, Box } from '@mui/material'


/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function SELECTED_IMAGE___REUSABLE({ src, handle_click_on_remove_button }) {

    return (
        // wrapper of img
        <Box sx={{
            width: { xs: '100px', sm: '125px', md: '150px' },
            height: { xs: '100px', sm: '125px', md: '150px' },
            position: 'relative',

            borderRadius: '10px',
            overflow: 'hidden',
        }}>

            {/* img */}
            <Box
                component='img'
                src={src}
                alt='selected_image'
                sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',

                    transition: 'transform .2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)'
                    }
                }}
            />


            {/* image remove button */}
            <Button
                onClick={() => handle_click_on_remove_button()}
                size="small"
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    }
                }}
            >
                Remove
            </Button>

        </Box>


    )
}






