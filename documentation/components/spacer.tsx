/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'
import useDarkTheme from '../hooks/dark-theme-hook'


/*__________________________________________

 ✅ Functional component
____________________________________________*/
function PAGE_HEADING_BOTTOM() {

    // theme
    const { dark_theme } = useDarkTheme()

    return (
        <div style={{
            height: '0.6rem',
            borderBottomWidth: '1.5px',
            borderBottomColor: 'inherit',
            borderBottomStyle: 'solid',
            opacity: dark_theme ? '15%' : '90%'
        }}>

        </div>
    )
}


/*__________________________________________

 ✅ Functional component
____________________________________________*/
function HEADING_TOP_SPACER___COMPONENT() {

    return (
        <div style={{ height: '3rem' }}>
        </div>
    )
}


/*__________________________________________

 ✅ Functional component
____________________________________________*/
function HEADING_BOTTOM_SPACER___COMPONENT() {

    return (
        <div style={{ height: '1rem' }}>
        </div>
    )
}



/*__________________________________________

 ✅ Functional component
____________________________________________*/
function HALF_REM_SPACER___COMPONENT() {

    return (
        <div style={{ height: '0.5rem' }}>
        </div>
    )
}


/*__________________________________________

 ✅ export
____________________________________________*/
export {
    PAGE_HEADING_BOTTOM,
    HEADING_TOP_SPACER___COMPONENT,
    HEADING_BOTTOM_SPACER___COMPONENT,
    HALF_REM_SPACER___COMPONENT
}
