import React from "react"
import Button from '@mui/material/Button'
import Theme from "../theme/theme";


export interface MuiButtonProps{
    dark: boolean,
    label: string
    variant: 'contained' | 'outlined'
}


export default function MuiButton(props: MuiButtonProps){

    const {dark, label, variant} = props


    return (

        <>

            <Theme dark={dark}>

                <Button variant={variant}>{label}</Button>

            </Theme>


        </>


    )
    
}


