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

// rich-text-editor-for-react-dependencies 
import dependencies from 'rich-text-editor-for-react-dependencies'
const {highlight_js} = dependencies
const {hljs} = highlight_js

/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function DisplayTheOutput(props: DisplayTheOutputType) {

    // 🍪 Props
    const {
        backgroundColor,
        primaryColor,
        html,
        typography
    } = props





    // ✅ TSX
    return (

        <MUI_THEME___COMPONENT
            backgroundColor={backgroundColor}
            primaryColor={primaryColor}
            typography={typography}
        >


            <CSS_FOR_QUILL___STYLED
                using_it_for="quill_generated_html"
                highlightJS={hljs}
            >

                {html}

            </CSS_FOR_QUILL___STYLED>


        </MUI_THEME___COMPONENT>
    )
}