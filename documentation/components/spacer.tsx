/*__________________________________________

 ✅ import
____________________________________________*/
import React from 'react'
import useDarkTheme from '../hooks/dark-theme-hook'


/*__________________________________________

 ✅ Functional component
____________________________________________*/
function HORIZONTAL_LINE_SPACER___COMPONENT() {

    // theme
    const { dark_theme } = useDarkTheme()

    return (
        <div style={{
            marginTop: '0.6rem',
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
        <div style={{ marginBottom: '2.5rem' }}>
        </div>
    )
}


/*__________________________________________

 ✅ Functional component
____________________________________________*/
function HEADING_BOTTOM_SPACER___COMPONENT() {

    return (
        <div style={{ marginBottom: '1rem' }}>
        </div>
    )
}


/*__________________________________________

 ✅ export
____________________________________________*/
export {
    HORIZONTAL_LINE_SPACER___COMPONENT,
    HEADING_TOP_SPACER___COMPONENT,
    HEADING_BOTTOM_SPACER___COMPONENT
}
