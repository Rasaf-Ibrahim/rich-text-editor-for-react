/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// types
import { DisplayTheOutputType } from "../types/types-for-the-users";

// components
import CSS_FOR_QUILL___STYLED from "../rich-text-editor/quill-rte/css-for-quill/css-for-quill";
import MUI_THEME___COMPONENT from '../theme/theme'



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function DisplayTheOutput(props: DisplayTheOutputType) {

    const {
        backgroundColor,
        primaryColor,
        html,
        highlightJS,
        typography
    } = props



    return (

        <MUI_THEME___COMPONENT
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            typography={typography}
        >


            <CSS_FOR_QUILL___STYLED
                using_it_for="quill_generated_html"
                highlightJS={highlightJS}
            >

                {html}

            </CSS_FOR_QUILL___STYLED>


        </MUI_THEME___COMPONENT>
    )
}