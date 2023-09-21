import { typographyType } from "../../../types/types-for-the-users"


export function theme_typography(typography:typographyType) {


    return {


        htmlFontSize: 16,
        fontFamily: 'Poppins, sans-serif',
        fontSize: 16,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 600,


        /* 🔖
          In the <CSS_FOR_QUILL___STYLED/>, we are using

          h3 for quill's h1
          h4 for quill's h2
          h5 for quill's h3
          h6 for quill's h4
          body1 for quill's p
          body2 for quill's h5
          subtitle2 for quill's h6

          This is why we are only checking "typography" props value:

          - only for h3,h4,h5,h6,body1,body2 and subtitle2,
          - not for h1,h2,subtitle1, caption & overline, 
        */


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
            fontSize: typography?.h1?.fontSize || 'clamp(2.063rem, 2.013rem + 0.27vw, 2.313rem)',
            fontFamily: typography?.h1?.fontFamily || 'Rubik, sans-serif',
            fontWeight: typography?.h1?.fontWeight || 500,
            lineHeight: typography?.h1?.lineHeight || 1.1,
            letterSpacing: typography?.h1?.letterSpacing || '0.004em',
        },


        h4: {
            // console.log(clampBuilder(300, 1800, 28, 31))
            fontSize: typography?.h2?.fontSize || 'clamp(1.75rem, 1.712rem + 0.2vw, 1.938rem)',
            fontFamily: typography?.h2?.fontFamily || 'Rubik, sans-serif',
            fontWeight: typography?.h2?.fontWeight || 500,
            lineHeight: typography?.h2?.lineHeight || 1.2,
            letterSpacing: typography?.h2?.letterSpacing || '0.005em',
        },


        h5: {
            // console.log(clampBuilder(300, 1800, 24, 27))
            fontSize: typography?.h3?.fontSize || 'clamp(1.5rem, 1.462rem + 0.2vw, 1.688rem)',
            fontFamily: typography?.h3?.fontFamily || 'Rubik, sans-serif',
            fontWeight: typography?.h3?.fontWeight || 500,
            lineHeight: typography?.h3?.lineHeight || 1.167,
            letterSpacing: typography?.h3?.letterSpacing || '0.005em',
        },

        
        h6: {
            // console.log(clampBuilder(300, 1800, 20, 23))
            fontSize: typography?.h4?.fontSize || 'clamp(1.25rem, 1.212rem + 0.2vw, 1.438rem)',
            fontFamily: typography?.h4?.fontFamily || 'Rubik, sans-serif',
            fontWeight: typography?.h4?.fontWeight || 500,
            lineHeight: typography?.h4?.lineHeight || 1.3,
            letterSpacing: typography?.h4?.letterSpacing || '0.005em',
        },


        body1: {
            // console.log(clampBuilder(300, 1800, 16, 18))
            fontSize: typography?.p?.fontSize || 'clamp(1rem, 0.975rem + 0.13vw, 1.125rem)',
            fontFamily: typography?.p?.fontFamily || "'Noto Sans', sans-serif",
            fontWeight: typography?.p?.fontWeight || 400,
            lineHeight: typography?.p?.lineHeight || 1.5,
            letterSpacing: typography?.p?.letterSpacing || '0.001em',
        },

        
        body2: {
            // console.log(clampBuilder(300, 1800, 14, 15))
            fontSize: typography?.h5?.fontSize || 'clamp(0.875rem, 0.863rem + 0.07vw, 0.938rem)',
            fontFamily: typography?.h5?.fontFamily || 'Poppins, sans-serif',
            fontWeight: typography?.h5?.fontWeight || 400,
            lineHeight: typography?.h5?.lineHeight || 1.52,
            letterSpacing: typography?.h5?.letterSpacing || '0.0025em'
        },


        subtitle1: {
            // console.log(clampBuilder(300, 1800, 16, 18))
            fontSize: 'clamp(1rem, 0.975rem + 0.13vw, 1.125rem)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 300,
            lineHeight: 1.5,
            letterSpacing: '0.001em',
        },


        subtitle2: {
            // console.log(clampBuilder(300, 1800, 14, 15))
            fontSize: typography?.h6?.fontSize || 'clamp(0.875rem, 0.863rem + 0.07vw, 0.938rem)',
            fontFamily: typography?.h6?.fontFamily || 'Poppins, sans-serif',
            fontWeight: typography?.h6?.fontWeight || 300,
            lineHeight: typography?.h6?.lineHeight || 1.52,
            letterSpacing: typography?.h6?.letterSpacing || '0.0025em',
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


        overline: {
            // console.log(clampBuilder(300, 1800, 12, 13))
            fontSize: 'clamp(0.75rem, 0.738rem + 0.07vw, 0.813rem)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 300,
            lineHeight: 1.55,
            letterSpacing: '0.003em',
            opacity: '90%'
        }


    }

}










































