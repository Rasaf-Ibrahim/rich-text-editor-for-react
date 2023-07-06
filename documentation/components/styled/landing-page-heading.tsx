// import
import styled  from "@emotion/styled"
import DARK_THEME___HOOK from "../../hooks/dark-theme-hook";


// type
type type_of_landing_page_heading_props = {

    children: type_of_child_component,
    more_style?: type_of_obj_with_any_values
}

// styled component
export default function LANDING_PAGE_HEADING___STYLED({children, more_style}:type_of_landing_page_heading_props) {


    // dark_theme
    const {dark_theme} = DARK_THEME___HOOK()

     
    // style
    const HEADING___STYLED = styled.div(props => ({

        marginTop: '3rem',

        textAlign: 'center',

        fontFamily: "'Kaushan Script', cursive",
        textTransform: 'uppercase',
        fontSize:'1rem',
        fontWeight: 500,
        letterSpacing: '2px',

        ...more_style
    }))



    return(

        <HEADING___STYLED>
        
             {children}

        </HEADING___STYLED>

    )

} 