

export function theme_typography() {


    return {


        htmlFontSize: 16,
        fontFamily: 'Poppins, sans-serif',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,


        h1: {
            /* console.log(clampBuilder(300, 1800, 45, 49)) */
            fontSize: 'clamp(2.813rem, 2.763rem + 0.27vw, 3.063rem)',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '0.004em'
        },


        h2: {
            /* console.log(clampBuilder(300, 1800, 39, 43)) */
            fontSize: 'clamp(2.438rem, 2.388rem + 0.27vw, 2.688rem)',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '0.004em'
        },


        h3: {
            /* console.log(clampBuilder(300, 1800, 33, 37)) */
            fontSize: 'clamp(2.063rem, 2.013rem + 0.27vw, 2.313rem)',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '0.004em'
        },


        h4: {
            // console.log(clampBuilder(300, 1800, 28, 31))
            fontSize: 'clamp(1.75rem, 1.712rem + 0.2vw, 1.938rem)',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            lineHeight: 1.2,
            letterSpacing: '0.005em'
        },


        h5: {
            // console.log(clampBuilder(300, 1800, 24, 27))
            fontSize: 'clamp(1.5rem, 1.462rem + 0.2vw, 1.688rem)',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            lineHeight: 1.167,
            letterSpacing: '0.005em'
        },

        h6: {
            // console.log(clampBuilder(300, 1800, 20, 23))
            fontSize: 'clamp(1.25rem, 1.212rem + 0.2vw, 1.438rem)',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: '0.005em'
        },


        body1: {
            // console.log(clampBuilder(300, 1800, 16, 18))
            fontSize: 'clamp(1rem, 0.975rem + 0.13vw, 1.125rem)',
            fontFamily: "'Noto Sans', sans-serif",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: '0.001em'
        },


        /* Difference between body1 and subtitle1 is the fontWeight */
        subtitle1: {
            // console.log(clampBuilder(300, 1800, 16, 18))
            fontSize: 'clamp(1rem, 0.975rem + 0.13vw, 1.125rem)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: '0.001em',
        },



        body2: {
            // console.log(clampBuilder(300, 1800, 14, 15))
            fontSize: 'clamp(0.875rem, 0.863rem + 0.07vw, 0.938rem)',
            fontFamily: 'Poppins, sans-serif',

            fontWeight: 400,
            lineHeight: 1.52,
            letterSpacing: '0.002.5em'
        },


        /* Difference between body2 and subtitle2 is the fontWeight */
        subtitle2: {
            // console.log(clampBuilder(300, 1800, 14, 15))
            fontSize: 'clamp(0.875rem, 0.863rem + 0.07vw, 0.938rem)',
            fontFamily: 'Poppins, sans-serif',

            fontWeight: 300,
            lineHeight: 1.52,
            letterSpacing: '0.002.5em',
            opacity: '90%'
        },


        caption: {
            // console.log(clampBuilder(300, 1800, 12, 13))
            fontSize: 'clamp(0.75rem, 0.738rem + 0.07vw, 0.813rem)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            lineHeight: 1.55,
            letterSpacing: '0.003em'
        },


        /* Difference between caption and overline is the fontWeight */
        overline: {
            // console.log(clampBuilder(300, 1800, 12, 13))
            fontSize: 'clamp(0.75rem, 0.738rem + 0.07vw, 0.813rem)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 300,
            lineHeight: 1.55,
            letterSpacing: '0.003em',
            opacity: '90%'
        },


    }

}










































