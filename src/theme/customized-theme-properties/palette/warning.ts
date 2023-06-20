import { amber } from '@mui/material/colors';


export function theme_palette_warning(darkModeVariable) {

     
    return {

        warning: {

            light: darkModeVariable ? amber[50] : amber[600],
            main: darkModeVariable ? amber[100] : amber[700],
            dark: darkModeVariable ? amber[200] : amber[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',

        }

    }

}