export function theme_palette_text(darkModeVariable) {

    const light_primary = `hsla(0, 0%, 100%, 1)`
    const light_secondary = `hsla(0, 0%, 100%, 0.7)`
    const light_disabled = `hsla(0, 0%, 100%, 0.4)`
    const dark_primary = `hsla(0, 0%, 0%, 0.87)`
    const dark_secondary = `hsla(0, 0%, 0%, 0.6)`
    const dark_disabled = `hsla(0, 0%, 0%, 0.38)`



    return {

        text: {
            
            primary: darkModeVariable ? light_primary : dark_primary,
            secondary: darkModeVariable ? light_secondary : dark_secondary,
            disabled: darkModeVariable ? light_disabled : dark_disabled,
          
        }

    }

}