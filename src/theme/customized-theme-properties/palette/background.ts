// css in js
import {lighten, darken} from 'polished'


// theme_palette_background function
export function theme_palette_background(darkModeVariable, backgroundColor) {

    return {

        background: {

            default: backgroundColor,

            paper: darkModeVariable? lighten(0.03, backgroundColor) : darken(0.03, backgroundColor)

        }

    }

}