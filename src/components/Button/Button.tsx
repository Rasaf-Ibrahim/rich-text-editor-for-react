import React from "react";
import Button from '@mui/material/Button'

export interface ReusableButtonProps{
    label: string
    variant: 'contained' | 'outlined'

}


export default function ReusableButton(props: ReusableButtonProps){

    const {label, variant} = props


    return (

        <>

            <Button variant={variant}>{label}</Button>

        </>


    )
    
}


