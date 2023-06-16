import React from "react"
import { ThemeProvider, createTheme} from '@mui/material/styles';
import { teal } from '@mui/material/colors';




export interface ThemeProps{
    dark:boolean
    children: any
}



export default function Theme(props:ThemeProps) {

    const {children, dark} = props


    const customizedTheme = createTheme({
        palette: {
            primary: {
                main: dark? teal[300] : teal[700],
            },
        },
    })
        


    return (

        <>
        
            <ThemeProvider theme={customizedTheme}>

                   {children}

            </ThemeProvider>
        
        </>

    )

}