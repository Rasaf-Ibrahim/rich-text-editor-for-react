/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// highlightJS library
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'

// types
import { DisplayTheOutputType } from "../types/types-for-the-users";

// components
import CSS_FOR_QUILL___STYLED from "../rich-text-editor/quill-rte/css-for-quill/css-for-quill";
import MUI_THEME___COMPONENT from '../theme/theme'


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