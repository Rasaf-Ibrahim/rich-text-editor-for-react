import React from "react"

import './index.css'

import { ThemeProvider, createTheme } from '@mui/material/styles';


// importing all the customized theme properties*
import {
    theme_palette_background,
    theme_palette_text,
    theme_palette_primary,
    theme_palette_secondary,
    theme_palette_error,
    theme_palette_warning,
    theme_palette_info,
    theme_palette_success,
    theme_palette_grey,
} from './customized-theme-properties/palette/_palette'

import { theme_typography } from './customized-theme-properties/typography/typography'

import { theme_breakpoints } from './customized-theme-properties/breakpoints/breakpoints'

import { theme_component_button } from './customized-theme-properties/components/button'

// types
import { PrimaryColorType } from "../rte/types/types-for-the-users";



export interface ThemeProps {
    dark: boolean
    primaryColor: PrimaryColorType
    children: any
}



export default function MuiTheme(props: ThemeProps) {

    const { children, dark, primaryColor } = props



    //colors
    const theme_palette_primary_obj = theme_palette_primary(dark, primaryColor)

    const theme_palette_secondary_obj = theme_palette_secondary(dark)

    const theme_palette_error_obj = theme_palette_error(dark)

    const theme_palette_warning_obj = theme_palette_warning(dark)

    const theme_palette_success_obj = theme_palette_success(dark)

    const theme_palette_info_obj = theme_palette_info(dark)

    const theme_palette_grey_obj = theme_palette_grey(dark)

    // text
    const theme_palette_text_obj = theme_palette_text(dark)

    //background
    const theme_palette_background_obj = theme_palette_background(dark)


    const theme_breakpoints_obj = theme_breakpoints()


    const theme_typography_obj = theme_typography()



    // button
    const theme_component_button_obj = theme_component_button()



    const customizedTheme = createTheme({


        /*🍪 Spacing 🍪 */
        spacing: factor => `${0.5 * factor}rem`,


        /*🍪 Breakpoints 🍪 */
        breakpoints: {

            ...theme_breakpoints_obj
        },


        /*🍪 Palette 🍪 */

        palette: {

            mode: dark ? 'dark' : 'light',


            // this background object controls the background color of our application
            ...theme_palette_background_obj,


            // primary, secondary, error, warning, success, info
            ...theme_palette_primary_obj,

            ...theme_palette_secondary_obj,

            ...theme_palette_error_obj,

            ...theme_palette_warning_obj,

            ...theme_palette_success_obj,

            ...theme_palette_info_obj,

            // grey
            ...theme_palette_grey_obj,


            // text
            ...theme_palette_text_obj,

        },


        /*🍪 Typography 🍪 */
        typography: {

            ...theme_typography_obj
        },


        components: {

            // button
            ...theme_component_button_obj as any,


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