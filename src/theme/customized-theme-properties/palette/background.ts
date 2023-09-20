// rich-text-editor-for-react-dependencies 
import dependencies from 'rich-text-editor-for-react-dependencies'

const {
    polished
} = dependencies

const { lighten, darken } = polished




// theme_palette_background function
export function theme_palette_background(darkModeVariable, backgroundColor) {

    return {

        background: {

            default: backgroundColor,

            paper: darkModeVariable? lighten(0.03, backgroundColor) : darken(0.03, backgroundColor)

        }

    }

}