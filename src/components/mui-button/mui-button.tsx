import React from "react"
import Button from '@mui/material/Button'
import MuiTheme, { PrimaryColorType } from "../theme/theme"


export interface MuiButtonProps {
    dark: boolean,
    primaryColor: PrimaryColorType
    label: string
    variant: 'contained' | 'outlined'
}


export default function MuiButton(props: MuiButtonProps) {

    const { dark, primaryColor, label, variant } = props


    return (

        <>

            <MuiTheme dark={dark} primaryColor={primaryColor}>

                <Button variant={variant}>{label}</Button>

            </MuiTheme>

        </>

    )

}


