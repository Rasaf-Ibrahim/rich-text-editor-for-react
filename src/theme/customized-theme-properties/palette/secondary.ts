import { lighten, darken, parseToRgb } from 'polished'


type type_of_payload = {
    dark: boolean,
    theme: any,
    iconColor: string
}

/* we are using the secondary color as the icon color */
export function theme_palette_secondary(payload:type_of_payload) {

    const {
        dark, 
        theme,
        iconColor
    } = payload


    let color:string

    if (iconColor) {

        const rgb_obj = parseToRgb(iconColor);

        const rgb_color = `rgb(${rgb_obj.red}, ${rgb_obj.green}, ${rgb_obj.blue})`;

        color = rgb_color
    }

    else {
        color = dark ? '#e6e6e6' : 'rgba(26,26,26,0.87)'


        /*🔖 We weren't using the above code, we were using this code:

            color = dark ? darken(0.1, theme.palette.text.primary) : lighten(0.1, theme.palette.text.primary)

            But the above code is not working when we bundle with rollup.
            
            
            We have tested darken(0.1, theme.palette.text.primary), this gives #e6e6e6 and 'lighten(0.1, theme.palette.text.primary)' gives rgba(26,26,26,0.87)

            We are manually using these colors manually currently.
        */
    }



    return {

        secondary: {
            light: color,
            main: color,
            dark: color,
        }

    }

}