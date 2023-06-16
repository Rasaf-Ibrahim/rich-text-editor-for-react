import React from "react"
import Alert from '@mui/material/Alert'


export interface MuiAlertProps{
   label: string
   severity: 'error' | 'warning' | 'info' | 'success'
}


export default function MuiAlert(props: MuiAlertProps){

    const {label, severity} = props


    return (

        <>

            <Alert severity={severity}>{label}</Alert>

        </>


    )

}


