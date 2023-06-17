import React from "react"
import Alert from '@mui/material/Alert'
import MuiTheme, { PrimaryColorType } from "../theme/theme"

export interface MuiAlertProps {
    dark: boolean,
    primaryColor: PrimaryColorType
    label: string
    severity: 'error' | 'warning' | 'info' | 'success'
}


export default function MuiAlert(props: MuiAlertProps) {

    const { dark, primaryColor, label, severity } = props



    return (

        <>

            <MuiTheme dark={dark} primaryColor={primaryColor}>

                <Alert severity={severity}>{label}</Alert>

            </MuiTheme>

        </>

    )

}


