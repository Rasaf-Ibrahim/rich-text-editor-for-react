const light_1 = `hsl(262, 60%, 89%)` 
const light_2 = `hsl(262, 60%, 84%)` 
const light_3 = `hsl(262, 60%, 79%)` 

const dark_1 = `hsl(262, 40%, 12%)`  
const dark_2 = 'hsl(262, 40%, 15%)'  
const dark_3 = 'hsl(262, 40%, 18%)'  



export function theme_palette_secondary(darkModeVariable) {

   
    return {

        secondary: {

            /* The light should be the lightest, then main should be little bit darker than light, then dark should be little bit more darker than main. The dark gets used for hover. */

            light: darkModeVariable ? light_1 : dark_3,
            main: darkModeVariable ? light_2 : dark_2,
            dark: darkModeVariable ? light_3 : dark_1,
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',

        }

    }

}