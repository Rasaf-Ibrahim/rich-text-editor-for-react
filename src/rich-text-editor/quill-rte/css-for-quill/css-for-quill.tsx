/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from "react"

// hook
import { useRef, useEffect } from "react"

// type
import { Theme } from "@mui/material";

// useTheme hook
import { useTheme } from '@mui/material/styles';


// css in js
import { css } from "@emotion/css";
import { lighten, darken } from 'polished'

// css related util
import css_media_queries from "../toolbar/styled-components/media-queries";


/*__________________________________________

 ✅ types
____________________________________________*/

type type_for_css_for_quill = {
    using_it_for: 'editor' | 'quill_generated_html',
    highlightJS?: never

} | {
    using_it_for: 'quill_generated_html',
    highlightJS?: any
}



/*__________________________________________

 ✅ Functional Component
____________________________________________*/
export default function CSS_FOR_QUILL___STYLED(props: React.PropsWithChildren<type_for_css_for_quill>) {

    // 🍪 theme
    const theme: Theme = useTheme()


    // 🍪 props
    const {
        using_it_for,
        highlightJS,
        children
    } = props



    /* 🍪

       using_it_for === 'quill_generated_html' means we want to display quill generated html
        
       At that time, we may need to highlight the code

       The following "useRef" & "useEffect" will ensure the code highlighting while displaying the quill generated htm   
    */
    const quill_generated_html_ref = useRef(null)

    useEffect(() => {
        if (using_it_for === 'quill_generated_html' && highlightJS && quill_generated_html_ref.current) {

            quill_generated_html_ref.current.querySelectorAll('pre code').forEach((block) => {
                highlightJS.highlightBlock(block)
            })

        }

    }, [])







    // JSX
    return (


        <div className={css`

            /* 🔖 Whatever CSS classnames you are seeing in this styled component, most of them  are  copied from quill.snow.css file.


                🧅 the official quill css file(quill.snow.css) has all the styles

                🧅 we needed to do customize some css classes's style of that official file, that's the reason of creating this styled component

                🧅 But as I have decided to not use quill.snow.css totally, so I have copied all the css classes that I need for my design

                🧅 specifically, we have copied all the quill editor related classes

                🧅 we have totally ignored all the quill toolbar related css classnames because we are not using the default quill toolbar

            */



            /* 🔖  Why are we styling quill toolbar once even though we are not using it?

                🧅 even though we are not using the default quill toolbar, while  initializing quill, value of toolbar module is set to true. 

                🧅 because without having the default toolbar, tooltip is not working. 

                🧅  we need tooltip(modal) at least when we need to edit inserted link

                🧅 so, technically, we will have the quill toolbar but we will hide it from the UI through CSS 
            */


            /*🥔 quill toolbar 🥔 */ 
            .ql-toolbar  {
                display: none;
            }


            /*🥔 quill editor - base Styles 🥔 */
            .ql-editor{

                /* appearance */
                background-color: ${theme.palette.background.default};
                color: ${theme.palette.text.primary};
               
                
                box-shadow: ${using_it_for === 'editor' ? `0px 0px 4px 2px ${theme.palette.divider}` : 'none'};

                outline: none;
                
                /* layout */
                box-sizing: border-box;
                padding: 12px 15px;
                height: 100%;
                overflow-y: auto;

                /* other */
                tab-size: 4;
                text-align: left;
                line-height: 1.42;
                white-space: pre-wrap;
                word-wrap: break-word;

            }


         



            /*🥔 quill editor - .ql-blank  🥔 

            .ql-blank is only active when we haven't typed anything in the editor yet

            */ 
            .ql-editor.ql-blank::before {
                color: ${theme.palette.text.secondary};
                content: attr(data-placeholder);
                font-style: italic;
                left: 15px;
                pointer-events: none;
                position: absolute;
                right: 15px;
            }


            /*🥔 quill editor - more Styles 🥔 */
            .ql-editor > * {
                cursor: text;
            }


            .ql-editor p,
            .ql-editor ol,
            .ql-editor ul,
            .ql-editor pre,
            .ql-editor blockquote,
            .ql-editor h1,
            .ql-editor h2,
            .ql-editor h3,
            .ql-editor h4,
            .ql-editor h5,
            .ql-editor h6 {
                margin: 0;
                padding: 0;
                counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
            }


            .ql-editor ol,
            .ql-editor ul {
                padding-left: 1.5em;
            }



            /* 🥔 quill editor - font 🥔 */
            .ql-editor .ql-font-serif {
                font-family: Georgia, Times New Roman, serif;
            }

            .ql-editor .ql-font-monospace {
                font-family: Monaco, Courier New, monospace;
            }



            /* 🥔 quill editor - typography 🥔 */
            .ql-editor h1 {
                font-size: ${theme.typography.h3.fontSize};
                font-weight: ${theme.typography.h3.fontWeight};
                font-family: ${theme.typography.h3.fontFamily};
                line-height: ${theme.typography.h3.lineHeight};
                letter-spacing: ${theme.typography.h3.letterSpacing};
            }


            .ql-editor h2 {
                font-size: ${theme.typography.h4.fontSize};
                font-weight: ${theme.typography.h4.fontWeight};
                font-family: ${theme.typography.h4.fontFamily};
                line-height: ${theme.typography.h4.lineHeight};
                letter-spacing: ${theme.typography.h4.letterSpacing};
            }


            .ql-editor h3 {
                font-size: ${theme.typography.h5.fontSize};
                font-weight: ${theme.typography.h5.fontWeight};
                font-family: ${theme.typography.h5.fontFamily};
                line-height: ${theme.typography.h5.lineHeight};
                letter-spacing: ${theme.typography.h5.letterSpacing};
            }


            .ql-editor h4{
                font-size: ${theme.typography.h6.fontSize};
                font-weight: ${theme.typography.h6.fontWeight};
                font-family: ${theme.typography.h6.fontFamily};
                line-height: ${theme.typography.h6.lineHeight};
                letter-spacing: ${theme.typography.h6.letterSpacing};
            }


            .ql-editor p, .ql-editor li {
                font-size: ${theme.typography.body1.fontSize};
                font-weight: ${theme.typography.body1.fontWeight};
                font-family: ${theme.typography.body1.fontFamily};
                line-height: ${theme.typography.body1.lineHeight};
                letter-spacing: ${theme.typography.body1.letterSpacing};
            }


            .ql-editor h5 { 
                font-size: ${theme.typography.body2.fontSize};
                font-weight: ${theme.typography.body2.fontWeight};
                font-family: ${theme.typography.body2.fontFamily};
                line-height: ${theme.typography.body2.lineHeight};
                letter-spacing: ${theme.typography.body2.letterSpacing};
            }


            .ql-editor h6 {
                font-size: ${theme.typography.subtitle2.fontSize};
                font-weight: ${theme.typography.subtitle2.fontWeight};
                font-family: ${theme.typography.subtitle2.fontFamily};
                line-height: ${theme.typography.subtitle2.lineHeight};
                letter-spacing: ${theme.typography.subtitle2.letterSpacing};
            }



            /* 🥔 quill editor - size  🥔 

            Even though we are not using size as a toolbar option, having the css

            */
            .ql-editor .ql-size-small {
            font-size: ${theme.typography.body2.fontSize};
            }
            .ql-editor .ql-size-large {
            font-size: ${theme.typography.h6.fontSize};
            }
            .ql-editor .ql-size-huge {
            font-size: ${theme.typography.h4.fontSize};
            }


            /* 🥔 quill editor - ul, li  🥔 */

            .ql-editor ol > li,
            .ql-editor ul > li {
                list-style-type: none;
            }

            .ql-editor ol li {
                counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
                counter-increment: list-0;
            }

            .ql-editor ul > li::before {
                content: '\\2022';
            }

            .ql-editor ol li:before {
                content: counter(list-0, decimal) '. ';
            }

            .ql-editor li::before {
                display: inline-block;
                white-space: nowrap;
                width: 1.2em;
            }


            .ql-editor li:not(.ql-direction-rtl)::before {
                margin-left: -1.5em;
                margin-right: 0.3em;
                text-align: right;
            }

            .ql-editor li.ql-direction-rtl::before {
                margin-left: 0.3em;
                margin-right: -1.5em;
            }

            .ql-editor ol li:not(.ql-direction-rtl),
            .ql-editor ul li:not(.ql-direction-rtl) {
                padding-left: 1.5em;
            }

            .ql-editor ol li.ql-direction-rtl,
            .ql-editor ul li.ql-direction-rtl {
                padding-right: 1.5em;
            }



            /* 🥔  quill editor - ul, li  🥔
            
                Don't know the purpose of the data-checked!
            */
            .ql-editor ul[data-checked=true],
            .ql-editor ul[data-checked=false] {
                pointer-events: none;
            }
            .ql-editor ul[data-checked=true] > li *,
            .ql-editor ul[data-checked=false] > li * {
                pointer-events: all;
            }
            .ql-editor ul[data-checked=true] > li::before,
            .ql-editor ul[data-checked=false] > li::before {
                color: ${theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[700]};
                cursor: pointer;
                pointer-events: all;
            }
            .ql-editor ul[data-checked=true] > li::before {
                content: '\\2611';
            }
            .ql-editor ul[data-checked=false] > li::before {
                content: '\\2610';
            }



            /* 🥔 quill editor -  Text Align & Direction 🥔 */

                .ql-editor .ql-align-center {
                    text-align: center;
                }
                .ql-editor .ql-align-justify {
                    text-align: justify;
                }
                .ql-editor .ql-align-right {
                    text-align: right;
                }

                .ql-editor .ql-direction-rtl {
                    direction: rtl;
                }


            

            /* 🥔 quill editor -  Indent 🥔 */

            .ql-editor ol li.ql-indent-1 {
                counter-increment: list-1;
            }
            .ql-editor ol li.ql-indent-1:before {
                content: counter(list-1, lower-alpha) '. ';
            }
            .ql-editor ol li.ql-indent-1 {
                counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
            }


            .ql-editor ol li.ql-indent-2 {
                counter-increment: list-2;
            }
            .ql-editor ol li.ql-indent-2:before {
                content: counter(list-2, lower-roman) '. ';
            }
            .ql-editor ol li.ql-indent-2 {
                counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
            }


            .ql-editor ol li.ql-indent-3 {
                counter-increment: list-3;
            }
            .ql-editor ol li.ql-indent-3:before {
                content: counter(list-3, decimal) '. ';
            }
            .ql-editor ol li.ql-indent-3 {
                counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
            }


            .ql-editor ol li.ql-indent-4 {
                counter-increment: list-4;
            }
            .ql-editor ol li.ql-indent-4:before {
                content: counter(list-4, lower-alpha) '. ';
            }
            .ql-editor ol li.ql-indent-4 {
                counter-reset: list-5 list-6 list-7 list-8 list-9;
            }


            .ql-editor ol li.ql-indent-5 {
                counter-increment: list-5;
            }
            .ql-editor ol li.ql-indent-5:before {
                content: counter(list-5, lower-roman) '. ';
            }
            .ql-editor ol li.ql-indent-5 {
                counter-reset: list-6 list-7 list-8 list-9;
            }


            .ql-editor ol li.ql-indent-6 {
                counter-increment: list-6;
            }
            .ql-editor ol li.ql-indent-6:before {
                content: counter(list-6, decimal) '. ';
            }
            .ql-editor ol li.ql-indent-6 {
                counter-reset: list-7 list-8 list-9;
            }


            .ql-editor ol li.ql-indent-7 {
                counter-increment: list-7;
            }
            .ql-editor ol li.ql-indent-7:before {
                content: counter(list-7, lower-alpha) '. ';
            }
            .ql-editor ol li.ql-indent-7 {
                counter-reset: list-8 list-9;
            }


            .ql-editor ol li.ql-indent-8 {
                counter-increment: list-8;
            }
            .ql-editor ol li.ql-indent-8:before {
                content: counter(list-8, lower-roman) '. ';
            }
            .ql-editor ol li.ql-indent-8 {
                counter-reset: list-9;
            }
            


            .ql-editor ol li.ql-indent-9 {
                counter-increment: list-9;
            }
            .ql-editor ol li.ql-indent-9:before {
                content: counter(list-9, decimal) '. ';
            }
            .ql-editor .ql-indent-1:not(.ql-direction-rtl) {
                padding-left: 3em;
            }


            .ql-editor li.ql-indent-1:not(.ql-direction-rtl) {
                padding-left: 4.5em;
            }
            .ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {
                padding-right: 3em;
            }
            .ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {
                padding-right: 4.5em;
            }


            .ql-editor .ql-indent-2:not(.ql-direction-rtl) {
                padding-left: 6em;
            }
            .ql-editor li.ql-indent-2:not(.ql-direction-rtl) {
                padding-left: 7.5em;
            }
            .ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {
                padding-right: 6em;
            }
            .ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {
                padding-right: 7.5em;
            }


            .ql-editor .ql-indent-3:not(.ql-direction-rtl) {
                padding-left: 9em;
            }
            .ql-editor li.ql-indent-3:not(.ql-direction-rtl) {
                padding-left: 10.5em;
            }
            .ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {
                padding-right: 9em;
            }
            .ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {
                padding-right: 10.5em;
            }


            .ql-editor .ql-indent-4:not(.ql-direction-rtl) {
                padding-left: 12em;
            }
            .ql-editor li.ql-indent-4:not(.ql-direction-rtl) {
                padding-left: 13.5em;
            }
            .ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {
                padding-right: 12em;
            }
            .ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {
                padding-right: 13.5em;
            }


            .ql-editor .ql-indent-5:not(.ql-direction-rtl) {
                padding-left: 15em;
            }
            .ql-editor li.ql-indent-5:not(.ql-direction-rtl) {
                padding-left: 16.5em;
            }
            .ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {
                padding-right: 15em;
            }
            .ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {
                padding-right: 16.5em;
            }


            .ql-editor .ql-indent-6:not(.ql-direction-rtl) {
                padding-left: 18em;
            }
            .ql-editor li.ql-indent-6:not(.ql-direction-rtl) {
                padding-left: 19.5em;
            }
            .ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {
                padding-right: 18em;
            }
            .ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {
                padding-right: 19.5em;
            }


            .ql-editor .ql-indent-7:not(.ql-direction-rtl) {
                padding-left: 21em;
            }
            .ql-editor li.ql-indent-7:not(.ql-direction-rtl) {
                padding-left: 22.5em;
            }
            .ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {
                padding-right: 21em;
            }
            .ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {
                padding-right: 22.5em;
            }


            .ql-editor .ql-indent-8:not(.ql-direction-rtl) {
                padding-left: 24em;
            }
            .ql-editor li.ql-indent-8:not(.ql-direction-rtl) {
                padding-left: 25.5em;
            }
            .ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {
                padding-right: 24em;
            }
            .ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {
                padding-right: 25.5em;
            }


            .ql-editor .ql-indent-9:not(.ql-direction-rtl) {
                padding-left: 27em;
            }
            .ql-editor li.ql-indent-9:not(.ql-direction-rtl) {
                padding-left: 28.5em;
            }
            .ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {
                padding-right: 27em;
            }
            .ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {
                padding-right: 28.5em;
            }
            



            /* 🥔 quill editor - blockquote 🥔 */

            .ql-editor blockquote {
                border-left: 4px solid ${theme.palette.mode === 'dark' ? darken(0.25, theme.palette.text.primary) : lighten(0.25, theme.palette.text.primary)};
                margin-bottom: 5px;
                margin-top: 5px;
                padding-left: 16px;

                font-size: ${theme.typography.subtitle2.fontSize};
                font-weight: ${theme.typography.subtitle2.fontWeight};
                font-family: ${theme.typography.subtitle2.fontFamily};
                line-height: ${theme.typography.subtitle2.lineHeight};
                letter-spacing: ${theme.typography.subtitle2.letterSpacing};
            }



            /* 🥔  quill editor - code-block 🥔 */
            .ql-snow .ql-editor code,
            .ql-snow .ql-editor pre {
                background-color: #f0f0f0;
                border-radius: 3px;
            }
            .ql-snow .ql-editor pre {
                white-space: pre-wrap;
                margin-bottom: 5px;
                margin-top: 5px;
                padding: 5px 10px;
            }
            .ql-snow .ql-editor code {
                font-size: 85%;
                padding: 2px 4px;
            }

            .ql-snow .ql-editor pre.ql-syntax {
                background-color: ${theme.palette.background.paper};
                color: ${theme.palette.text.primary};
                border: 1px solid ${theme.palette.divider};
                overflow: visible;


                font-size: ${theme.typography.body2.fontSize};
                font-weight: ${theme.typography.body2.fontWeight};
                font-family: ${theme.typography.body2.fontFamily};
                line-height: ${theme.typography.body2.lineHeight};
                letter-spacing: ${theme.typography.body2.letterSpacing};
            }



            /* 🥔 quill editor -  Inserted Image🥔 */
            .ql-snow .ql-editor img {

                /* when we resize image, there should be a limitation */
                max-width: 90%;
                min-width: 100px;
            }


            /* 🥔 quill editor -  Inserted Link🥔 */
            .ql-snow .ql-editor a {
                text-decoration: underline;
            }

            .ql-snow a {
                color: ${theme.palette.info.main};
            }


            /* 🥔 quill editor -  Embedded Video 🥔 */
            .ql-editor .ql-video {
                display: block;
                max-width: 100%;
            }

            .ql-editor .ql-video.ql-align-center {
                margin: 0 auto;
            }

            .ql-editor .ql-video.ql-align-right {
                margin: 0 0 0 auto;
            }




            /* 🥔 quill tooltip 🥔 

            - tooltip is actually a modal
            - tooltip is needed for link, video and formula
            
            */


            .ql-snow .ql-tooltip {
                background-color: ${theme.palette.background.paper};
                color: ${theme.palette.text.primary};
                border: 1px solid ${theme.palette.primary.dark};
                box-shadow: 0px 0px 5px  ${theme.palette.primary.dark};
                padding: 0.5rem 1rem;
                white-space: nowrap;
                z-index: 10;
            }

            /* tooltip - visibility */
            .ql-container.ql-disabled .ql-tooltip {
                visibility: hidden;
            }

            /* tooltip - position */
            .ql-snow .ql-tooltip {
                position: absolute;
                transform: translateY(10px);
            }

            
            /* tooltip - transform */
            .ql-snow .ql-tooltip.ql-flip {
                transform: translateY(-10px);
            }

            /* tooltip - style for <a/> tag */
            .ql-snow .ql-tooltip a {
                line-height: 26px;
            }

            .ql-snow .ql-tooltip a {
                cursor: pointer;
                text-decoration: none;
            }


            .ql-snow .ql-tooltip a.ql-preview {
                display: inline-block;
                max-width: 200px;
                overflow-x: hidden;
                text-overflow: ellipsis;
                vertical-align: top;
            }


            .ql-snow .ql-tooltip.ql-editing a.ql-preview,
            .ql-snow .ql-tooltip.ql-editing a.ql-remove {
                display: none;
            }


            /* tooltip - 'Visit URL' text */

            .ql-tooltip::before {
                content: "Visit URL:";
                line-height: 26px;
                margin-right: 8px;
                color: ${theme.palette.text.primary};
            }

            /* tooltip - 'Edit' button */
            .ql-snow .ql-tooltip a.ql-action::after {
                border-right: 1px solid ${theme.palette.divider};
                color: ${theme.palette.text.primary};
                content: 'Edit';
                margin-left: 16px;
                padding-right: 8px;
            }


            /* tooltip - 'Remove' button */
            .ql-snow .ql-tooltip a.ql-remove::before {
                content: 'Remove';
                margin-left: 8px;
                color: ${theme.palette.primary.main};
            }





            /* Input field for editing the inserted link */

            .ql-snow .ql-tooltip input[type=text] {
                display: none;
                border: 1px solid ${theme.palette.text.secondary};
                font-size: 13px;
                height: 26px;
                margin: 0px;
                padding: 3px 5px;
                width: 170px;
            }


            .ql-snow .ql-tooltip.ql-editing input[type=text] {
                display: inline-block;
                background-color: ${theme.palette.background.paper};
                color: ${theme.palette.text.primary};
                border: 2px solid ${theme.palette.primary.light};
                box-shadow: 0px 0px 2px  ${theme.palette.primary.dark};
                outline: none;
            }

            .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
                border-right: 0px;
                content: 'Save';
                padding-right: 0px;
                color: ${theme.palette.primary.main};
            }

            .ql-snow .ql-tooltip[data-mode=link]::before {
                content: "Enter link:";
                color: ${theme.palette.primary.main};
            }

            .ql-snow .ql-tooltip[data-mode=formula]::before {
                content: "Enter formula:";
                color: ${theme.palette.primary.main};
            }

            .ql-snow .ql-tooltip[data-mode=video]::before {
                content: "Enter video:";
                color: ${theme.palette.primary.main};
            }





            /* 🔖Why do we need to style clipboard?

            🧅 by default, there is a quill clipboard element. It has .ql-clipboard class. It's actually a sibling element of the .ql-container element. 

            🧅 quill clipboard is meant to be hidden

            🧅 the following styles are making sure that the clipboard is hidden, if we don't use the following styles, we will see an additional input field after the editor! 

            */

            /* 🥔 quill clipboard 🥔 */
            .ql-clipboard {
                left: -100000px;
                height: 1px;
                overflow-y: hidden;
                position: absolute;
                top: 50%;
            }
            .ql-clipboard p {
                margin: 0;
                padding: 0;
            }




            /* 🥔 quill container - Don't know the purpose of the following styles! 🥔 */

            .ql-container {
                box-sizing: border-box;
                font-family: Helvetica, Arial, sans-serif;
                font-size: 13px;
                height: 100%;
                margin: 0px;
                position: relative;
            }

            .ql-container.ql-snow {
                /* don't want this border*/
                border: 0px solid #ccc;
            }

            .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
                pointer-events: none;
            }



            /* 🥔 quill snow - Don't know the purpose of the following styles! 🥔 */
            .ql-snow {
                box-sizing: border-box;
            }
            .ql-snow * {
                box-sizing: border-box;
            }
            .ql-snow .ql-hidden {
                display: none;
            }
            .ql-snow .ql-out-bottom,
            .ql-snow .ql-out-top {
                visibility: hidden;
            }




            /* 🥔 custom - the following classes are necessary for resizing image  🥔 */

            /* 🔖 

              💡 In this bookmark, when we will talk about width with xs, sm, md, lg, xl, 2xl or 3xl, we will specifically mention the word "width"  
               

              💡 And when we will talk about breakpoints with xs, sm, md, lg & xl, we will specifically mention the word "screen"  

               
              💡 What we want to achieve? 

                difference between width xs, sm, md, lg will be large
                difference between width lg, xl & 2xl, 3xl will be small
              

              💡 how to calculate?

                if width xs 25%, width lg is 70%, width 3xl is 95% 

                range of width, xs to lg = 70% - 25% = 45%
                range of width, lg to 3xl = 70% - 95% = 25%

                gap of width, xs to lg = 45% / 3 = 15%
                gap of width, lg to 3xl = 25% / 3 = 8.3%
                
                all 7 width percentages for xs, sm, md, lg, xl, 2xl, 3xl = 25%, 40%, 55%, 70%, 78.3% , 86.6, 95%


              🧅 for xs screen: if xs 25%, lg is 70%, 3xl is 95% 
              🧅 for sm screen: if xs 21%, lg is 50%, 3xl is 70% 
              🧅 for md screen: if xs 17%, lg is 45%, 3xl is 65% 
              🧅 for lg screen: if xs 13%, lg is 40%, 3xl is 60% 
              🧅 for xl screen: if xs 9%, lg is 35%, 3xl is 55% 

            */

            .ql-editor .ql-image-size-xs{

                ${css_media_queries.name_xs_sm_md_lg_xl('width', '25%', '21%', '17%', '13%', '9%')}
            }


            .ql-editor .ql-image-size-sm{

                ${css_media_queries.name_xs_sm_md_lg_xl('width', '38.3%', '30.67%', '26.33%', '22%', '17.67%')}
            }


            .ql-editor .ql-image-size-md{

                ${css_media_queries.name_xs_sm_md_lg_xl('width', '51.6%', '40.34%', '35.66%', '31%', '26.34%')}
            }


            .ql-editor .ql-image-size-lg{

                ${css_media_queries.name_xs_sm_md_lg_xl('width', '65%', '50%', '45%', '40%', '35%')}
            }


            .ql-editor .ql-image-size-xl{

                ${css_media_queries.name_xs_sm_md_lg_xl('width', '75%', '56.67%', '51.67%', '46.67%', '41.67%')}
            }


            .ql-editor .ql-image-size-2xl{

                ${css_media_queries.name_xs_sm_md_lg_xl('width', '85%', '63.34%', '58.34%', '53.34%', '48.34%')}
            }


            .ql-editor .ql-image-size-3xl{

                ${css_media_queries.name_xs_sm_md_lg_xl('width', '95%', '70%', '65%', '60%', '55%')}
            }








                /* 🥔 custom - the following classes are necessary for aligning image  🥔 */

                .ql-editor .ql-custom-align-center {

                    width: 100%;
                    text-align: center;
                }


                .ql-editor .ql-custom-align-right {

                    width: 100%;
                    text-align: right;
                }


                .ql-editor .ql-custom-align-left {

                    width: 100%;
                    text-align: left;
                }


            
        `}>





            {/* 🔖

                    We use this component for the editor, also we use this component to display the quill generated html.
                    
                    And if you check the following code, you will notice that we are setting the "children" differently for each usage. But why is that?


                    if you check the "rte/quill-rte/quill-rte.tsx" file, you will see that we are using this component like this:

                    " 
                        <CSS_FOR_QUILL___STYLED using_it_for='editor'>

                        
                            <Box ref={quillEditorRef}>
                            </Box>

                        </CSS_FOR_QUILL___STYLED>  
                    "


                    The above setup for <CSS_FOR_QUILL___STYLED/> automatically creates 2 extra div & 3 classNames for the quill editor(check in the browser by inspecting): 
                    
                    "
                        <div> 
                        
                            <div className='ql-container ql-snow'>
                    
                                <div className='ql-editor'> </div>
                                
                            </div>
                        
                        </div>
                    "
                

                    But this extra div and className doesn't get generated when we use this component for "quill generated html". That is the reason, we are manually creating these extra div and className when we are using this component for the quill generated html.

            */}


            {/* for editor */}
            {using_it_for === 'editor' &&

                <>

                    {children}

                </>

            }



            {/* for quill generated html */}
            {using_it_for === 'quill_generated_html' &&

                <div className='ql-container ql-snow'>

                    <div className='ql-editor'>


                        <div ref={quill_generated_html_ref} dangerouslySetInnerHTML={{ __html: children }} />

                    </div>

                </div>
            }



        </div>
    )

}