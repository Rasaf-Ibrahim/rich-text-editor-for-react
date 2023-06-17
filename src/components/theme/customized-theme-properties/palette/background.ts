const light_1 = 'hsl(0, 0%, 99%)'
const dark_1 = 'hsl(200, 10%, 10%)'  



export function theme_palette_background(darkModeVariable) {


    return {

        background: {

            default: darkModeVariable ? dark_1 : light_1,

            // when the paper's elevation is 0, it will have same color as the background
            paper: darkModeVariable ? dark_1 : light_1,

        }


    }

}