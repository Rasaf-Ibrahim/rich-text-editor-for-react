// polished
import { lighten, darken, parseToRgb  } from '../../../dependencies/polished/polished'


type type_of_payload = {
    dark: boolean,
    primaryColor: string
}


// theme_palette_primary function
export function theme_palette_primary(payload: type_of_payload) {

    const {
        dark,
        primaryColor
    } = payload


        /*🔖 Importance of rgb color conversion:

          MUI supports color code but it doesn't support string like 'blue', 'red', 'yellow', etc. So, if a user pass a string a like this as prop, he will get an error.

          To solve this issue, we are using polished library's 'parseToRgb' util to convert the string to code.

          Exception: Only for the background color, MUI supports string like  'blue', 'red', 'yellow', etc.
    */

    const rgb_object_of_primary_color = parseToRgb(primaryColor)

    const rgb_of_primary_color = `rgb(${rgb_object_of_primary_color.red}, ${rgb_object_of_primary_color.green}, ${rgb_object_of_primary_color.blue})`;





    return {

        primary: {

            light: lighten(0.03, rgb_of_primary_color),

            main: rgb_of_primary_color,

            dark: darken(0.05, rgb_of_primary_color),

            contrastText: dark ? 'rgba(0, 0, 0, 0.87)' : '#fff',

        }


    }

}