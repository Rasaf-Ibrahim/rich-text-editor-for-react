import { teal } from '@mui/material/colors';


export function theme_palette_success(darkModeVariable) {

    return {

        success: {

            light: darkModeVariable ? teal[50] : teal[600],
            main: darkModeVariable ? teal[100] : teal[700],
            dark: darkModeVariable ? teal[200] : teal[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',

        }


    }

}