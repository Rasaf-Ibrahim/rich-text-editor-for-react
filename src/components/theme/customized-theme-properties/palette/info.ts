import { indigo } from '@mui/material/colors';


export function theme_palette_info(darkModeVariable) {
    

    return {

        info: {

            light: darkModeVariable ? indigo[50] : indigo[600],
            main: darkModeVariable ? indigo[100] : indigo[700],
            dark: darkModeVariable ? indigo[200] : indigo[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',

        }

    }

}