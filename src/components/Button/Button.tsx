import React from "react";
import Button from '@mui/material/Button'

export interface ButtonProps{
    label: string
    variant: 'contained' | 'outlined'

}


export default function MuiButton(props: ButtonProps){

    const {label, variant} = props


    return (

        <>

            <Button variant={variant}>{label}</Button>

        </>


    )
    
}


