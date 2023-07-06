/*__________________________________________

 ✅ import
____________________________________________*/
import styled  from "@emotion/styled";
import LANDING_PAGE_HEADING___STYLED from '../components/styled/landing-page-heading'
import { MdDoneAll } from "react-icons/md";




/*__________________________________________

 ✅ Functional component
____________________________________________*/
export default function FEATURES___COMPONENT() {

    // style
    const WRAPPER_OF_FEATURES___STYLED = styled.button`

           font-size:16px; 
           margin-top:2rem;

           display: flex;
           flex-wrap: wrap;
           justify-content: center;
           gap: 1rem;


           cursor: default;


            @media (max-width: 600px) {
                display: block;
                text-align: left;
                margin-left: 1.5rem;
            }

    `;


    
    //  features
    const features = [
        /* not making any feature's description long so that no feature takes more than a line even in the phone */
        '25+ Toolbar Options',
        'Light & Dark Theme',
        'UI customizations',
        'Image uploading to Cloudinary',
        'Image Resizing',
        'Auto Code highlighting',
    ]
    

    // tsx
    return (


        <div style={{marginTop:'3rem', marginBottom:'4rem'}}> 

            <LANDING_PAGE_HEADING___STYLED>
                Features
            </LANDING_PAGE_HEADING___STYLED>

            <WRAPPER_OF_FEATURES___STYLED> 

                {features.map((feature) => {

                    return (

                        <div style={{display:'flex', gap:'5px', alignItems:'center'}}>

                           <MdDoneAll style={{fontSize:'19px'}}/>
                           <span>{feature}</span> 
                
                        </div>
                    )
                })}

            </WRAPPER_OF_FEATURES___STYLED>

        </div>
    
    )
}