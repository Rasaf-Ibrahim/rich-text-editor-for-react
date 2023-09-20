/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from "react"

// css
import './index.css'

// mui theme
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'

// type
import { typographyType } from "../types/types-for-the-users"


// css in js
import { lighten, darken, getLuminance, parseToRgb } from 'polished'


// customized theme properties
import {
    theme_palette_background,
    theme_palette_text,
    theme_palette_primary,
    theme_palette_secondary,
    theme_palette_error,
    theme_palette_info,
    theme_palette_grey,
} from './customized-theme-properties/palette/_palette'

import { theme_typography } from './customized-theme-properties/typography/typography'

import { theme_breakpoints } from './customized-theme-properties/breakpoints/breakpoints'

import { theme_component_button } from './customized-theme-properties/components/button'



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_mui_theme = {
    backgroundColor: string
    primaryColor: string
    iconColor?: string
    typography: typographyType
}



/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function MUI_THEME___COMPONENT(props: React.PropsWithChildren<type_of_mui_theme>) {


    // 🍪 props
    const {
        children,
        backgroundColor,
        primaryColor,
        iconColor,
        typography
    } = props


    // 🍪 theme
    const theme = useTheme()


    // 🍪 deciding the theme is dark or not
    let dark = getLuminance(backgroundColor) < 0.5 ? true : false


    // 🍪 background color (receiving form the  user)
    const theme_palette_background_obj = theme_palette_background(dark, backgroundColor)


    // 🍪 text color
    const theme_palette_text_obj = theme_palette_text(dark)


    //🍪 primary color 
    const theme_palette_primary_obj = theme_palette_primary({
        dark: dark,
        primaryColor: primaryColor
    })


    // 🍪 secondary color (using for coloring any icon)
    const theme_palette_secondary_obj = theme_palette_secondary({
        iconColor: iconColor,
        theme: theme,
        dark: dark
    })


    // 🍪 error color (using for error message)
    const theme_palette_error_obj = theme_palette_error(dark)


    // 🍪 info color (using for <a/> color in editor)
    const theme_palette_info_obj = theme_palette_info(dark)


    // 🍪 grey color (using in couple of places in the editor)
    const theme_palette_grey_obj = theme_palette_grey(dark)


    // 🍪 breakpoints
    const theme_breakpoints_obj = theme_breakpoints()


    // 🍪 typography
    const theme_typography_obj = theme_typography(typography)


    // 🍪 button
    const theme_component_button_obj = theme_component_button()



    // 🍪 creating theme
    const customizedTheme = createTheme({


        // Spacing 
        spacing: factor => `${0.5 * factor}rem`,


        // Breakpoints 
        breakpoints: {

            ...theme_breakpoints_obj
        },


        // Palette 
        palette: {

            mode: dark ? 'dark' : 'light',


            // this background object controls the background color of our application
            ...theme_palette_background_obj,


            // primary, secondary, error, warning, success, info
            ...theme_palette_primary_obj,

            ...theme_palette_secondary_obj,

            ...theme_palette_error_obj,

            ...theme_palette_info_obj,

            // grey
            ...theme_palette_grey_obj,


            // text
            ...theme_palette_text_obj,

        },


        // Typography 
        typography: {

            ...theme_typography_obj
        },


        // components
        components: {

            // button
            ...theme_component_button_obj as any,


        },


    })



    // ✅ TSX
    return (

        <>

            <ThemeProvider theme={customizedTheme}>

                {children}

            </ThemeProvider>

        </>

    )

}