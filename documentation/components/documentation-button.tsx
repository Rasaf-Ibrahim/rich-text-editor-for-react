/*__________________________________________

 ✅ import
____________________________________________*/

// router
import Link from "next/link"

// hook
import DARK_THEME___HOOK from "../hooks/dark-theme-hook"

// icons
import { MdCallMade } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";

// styled components
import styled  from "@emotion/styled";

// components
import LANDING_PAGE_HEADING___STYLED from '../components/styled/landing-page-heading'


/*__________________________________________

 ✅ Functional component
____________________________________________*/
export default function DOCUMENTATION_BUTTON___COMPONENT() {

    // dark_theme
    const {dark_theme} = DARK_THEME___HOOK()


    const LINE___STYLED = styled.div`

        width:292px;

        border-bottom-width:3px;
        border-color: ${dark_theme? 'white' : 'black'};
        border-style:dotted;

        opacity: 40%;

        margin-right:7px;
    `;


    return(


        <Link href='/docs'>


            <div style={{
                marginTop:'3rem', 
                textAlign:'center',

                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:'0.5rem',
                
            }}>
            
                

                <LANDING_PAGE_HEADING___STYLED  
                 more_style={{letterSpacing:'8px', display:'flex', gap:'5px', alignItems:'center'}}>

                    <GiNotebook style={{fontSize:'24px'}}/>

                    Documentation 

                    <MdCallMade style={{fontSize:'20px'}}/>

                </LANDING_PAGE_HEADING___STYLED>

                 <LINE___STYLED/> 

                
                
            </div>


        </Link>
    )

}



