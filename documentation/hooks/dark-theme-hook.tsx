/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'


/*__________________________________________

 ✅ hook
____________________________________________*/
export default function useDarkTheme() {

    // useTheme
    const { theme } = useTheme()

    // darkMode state
    const [dark_theme, set_dark_theme] = useState(false)


    // on mount or theme change, updating dark_theme state
    useEffect(() => {


        const isDark = () => {

            // system
            if (theme === 'system') {

                let is_the_theme_of_the_system_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches


                if (is_the_theme_of_the_system_dark) {
                    return true
                }

                else {
                    return false
                }

            }


            // dark
            else if (theme === 'dark') {
                return true
            }


            // light
            else if (theme === 'light') {
                return false
            }


        }

        const is_theme_dark = isDark()

        set_dark_theme(is_theme_dark)



    })



    return {

        dark_theme
    }


}