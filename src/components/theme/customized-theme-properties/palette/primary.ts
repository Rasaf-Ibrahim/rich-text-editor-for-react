
// 🥪  theme_palette_primary function
export function theme_palette_primary(darkModeVariable, primaryColor) {




    // 🍔 selected_color function
    function selected_color() {


        /* 🔖 In an above comment, we have selected some colors after doing dozens of test. In the following, we are only having those tested colors.  */


        const red = {

            light_1: `hsl(14, 60%, 89%)`,
            light_2: `hsl(14, 60%, 84%)`,
            light_3: `hsl(14, 60%, 79%)`,

            dark_1: `hsl(14, 40%, 12%)`,
            dark_2: 'hsl(14, 40%, 15%)',
            dark_3: 'hsl(14, 40%, 18%)'

        }


        const amber = {

            light_1: `hsl(45, 60%, 89%)`,
            light_2: `hsl(45, 60%, 84%)`,
            light_3: `hsl(45, 60%, 79%)`,

            dark_1: `hsl(45, 40%, 12%)`,
            dark_2: 'hsl(45, 40%, 15%)',
            dark_3: 'hsl(45, 40%, 18%)'
        }


        const light_green = {

            light_1: `hsl(88, 60%, 89%)`,
            light_2: `hsl(88, 60%, 84%)`,
            light_3: `hsl(88, 60%, 79%)`,

            dark_1: `hsl(88, 40%, 12%)`,
            dark_2: 'hsl(88, 40%, 15%)',
            dark_3: 'hsl(88, 40%, 18%)'
        }


        const cyan = {

            light_1: `hsl(187, 60%, 89%)`,
            light_2: `hsl(187, 60%, 84%)`,
            light_3: `hsl(187, 60%, 79%)`,

            dark_1: `hsl(187, 40%, 12%)`,
            dark_2: 'hsl(187, 40%, 15%)',
            dark_3: 'hsl(187, 40%, 18%)'
        }


        const indigo = {

            light_1: `hsl(262, 60%, 89%)`,
            light_2: `hsl(262, 60%, 84%)`,
            light_3: `hsl(262, 60%, 79%)`,

            dark_1: `hsl(262, 40%, 12%)`,
            dark_2: 'hsl(262, 40%, 15%)',
            dark_3: 'hsl(262, 40%, 18%)'
        }


        if (primaryColor === 'red') return red

        else if (primaryColor === 'amber') return amber

        else if (primaryColor === 'light_green') return light_green

        else if (primaryColor === 'cyan') return cyan

        else if (primaryColor === 'indigo') return indigo


    }


    // 🍔 selected_color() returns the selected color object 
    const selected_color_obj = selected_color()



    // 🍔 at last, returning primary colors
    return {

        primary: {


            light: darkModeVariable ? selected_color_obj.light_1 : selected_color_obj.dark_3,

            main: darkModeVariable ? selected_color_obj.light_2 : selected_color_obj.dark_2,

            dark: darkModeVariable ? selected_color_obj.light_3 : selected_color_obj.dark_1,

            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',


        }


    }

}