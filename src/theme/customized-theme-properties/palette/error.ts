import { pink } from '../../../dependencies/mui/colors'


export function theme_palette_error(darkModeVariable) {


    return {

        error: {

            light: darkModeVariable ? pink[50] : pink[600],
            main: darkModeVariable ? pink[100] : pink[700],
            dark: darkModeVariable ? pink[200] : pink[800],
            contrastText: darkModeVariable ? 'rgba(0, 0, 0, 0.87)' : '#fff',

        }


    }

}