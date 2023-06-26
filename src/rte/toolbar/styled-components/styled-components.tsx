// react
import React from 'react'

// styled components
import media_queries from './media-queries';
import { styled } from '@mui/material/styles';

// mui components
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';


/* 🥪 */
const MODAL_CONTENT___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box  {...props} />
)
    (({ theme }) => `

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    background: ${theme.palette.background.paper};
    box-shadow: 2rem;
    padding: 2rem;
`)




const SELECT___STYLED = styled((props: type_of_obj_with_any_values) =>


    <Select {...props} variant="standard" disableUnderline />


)(({ theme }) => `

   font-size: ${theme.typography.overline.fontSize};
`)





const MENU_ITEM___STYLED = styled((props: type_of_obj_with_any_values) =>

    <MenuItem {...props} />


)(({ theme }) => `

   font-size: ${theme.typography.overline.fontSize}

`)







/* 🥪 */
const WRAPPER_OF_FORM___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box  {...props} />
)
    (({ theme }) => `

display:flex;
flex-direction:column;
align-items: center;
`)



/* 🥪 */
const WRAPPER_OF_FORM_CONTENT___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box  {...props} component='form' />
)
    (({ theme }) => `

    ${media_queries.name_xs_sm_md_lg('width', '18rem', '20rem', '22rem', '24rem')};

    ${/*when the width is increasing 2, we need to increase the padding the padding 1 because padding has right and left. */ ''}
    ${media_queries.name_xs_sm_md_lg('padding-right', '1rem', '2rem', '3rem', '4rem')};
    ${media_queries.name_xs_sm_md_lg('padding-left', '1rem', '2rem', '3rem', '4rem')};
    padding-top:1rem;
    padding-bottom:1rem;

    background-color: ${theme.palette.background.paper};


    ${/* Button's size is getting changed while toggling the email form if we use display:'grid' instead of display:'flex' & flex-direction:'column' */ ''}
    display: flex;
    flex-direction: column;
    justify-content: center; 
    gap: 1.2rem; 
`)




/* 🥪 */

/* 🔖 Way to use the <CSS_FOR_QUILL_EDITOR____STYLED/> styled component:


Place the <CSS_FOR_QUILL_EDITOR____STYLED/>  styled component as the parent component of the quill editor component. Example: 

     <CSS_FOR_QUILL_EDITOR____STYLED>

         <Box ref={quillEditorRef}></Box>

     </CSS_FOR_QUILL_EDITOR____STYLED>

*/

const CSS_FOR_QUILL_EDITOR____STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box {...props} />

)(({ theme }) => `


   ${/* 🔖 Whatever CSS classnames you are seeing in this styled component, most of them  are  copied from quill.snow.css file.


    🍗 the official quill css file(quill.snow.css) has all the styles

    🍗 we needed to do customize some css classes's style of that official file, that's the reason of creating this styled component

    🍗 But as I have decided to not use quill.snow.css totally, so I have copied all the css classes that I need for my design

    🍗 specifically, we have copied all the quill editor related classes

    🍗 we have totally ignored all the quill toolbar related css classnames because we are not using the default quill toolbar
   
   */''}
   


    ${/* 🔖  Why are we styling quill toolbar once even though we are not using it?

        🍗 even though we are not using the default quill toolbar, while  initializing quill, value of toolbar module is set to true. 

        🍗 because without having the default toolbar, tooltip is not working. 

        🍗  we need tooltip(modal) at least when we need to edit inserted link

        🍗 so, technically, we will have the quill toolbar but we will hide it from the UI through CSS 
    */''}

    ${/*🍔 quill toolbar 🍔 */ ''} 
    .ql-toolbar  {
        display: none;
    }



    ${/*🍔 quill editor - base Styles 🍔 */ ''}
     .ql-editor{
        box-sizing: border-box;

        padding: 12px 15px;
        height: 100%;
        tab-size: 4;
        -moz-tab-size: 4;

        
        text-align: left;
        line-height: 1.42;
        white-space: pre-wrap;
        word-wrap: break-word;

        overflow-y: auto;
        
        ${/* the following box shadow is set to match quill's toolbar's style   */''}
        box-shadow: 0px 0px 4px 2px ${theme.palette.divider};
        outline: none;
    }


    ${/*🍔 quill editor - .ql-blank  🍔 
    
     .ql-blank is only active when we haven't typed anything in the editor yet
    
    */ ''}
    .ql-editor.ql-blank::before {
        color: ${theme.palette.text.secondary};
        content: attr(data-placeholder);
        font-style: italic;
        left: 15px;
        pointer-events: none;
        position: absolute;
        right: 15px;
    }


    ${/*🍔 quill editor - more Styles 🍔 */ ''}
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


   
    ${/* 🍔 quill editor - font 🍔 */''}
    .ql-editor .ql-font-serif {
        font-family: Georgia, Times New Roman, serif;
    }

    .ql-editor .ql-font-monospace {
    font-family: Monaco, Courier New, monospace;
    }
    
 

    ${/* 🍔 quill editor - typography 🍔 */''}
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



    ${/* 🍔 quill editor - size  🍔 
    
     Even though we are not using size as a toolbar option, having the css
    
    */ ''}
    .ql-editor .ql-size-small {
      font-size: ${theme.typography.body2.fontSize};
    }
    .ql-editor .ql-size-large {
      font-size: ${theme.typography.h6.fontSize};
    }
    .ql-editor .ql-size-huge {
      font-size: ${theme.typography.h4.fontSize};
    }


    ${/* 🍔 quill editor - ul, li  🍔 */ ''}

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


 
      ${/* 🍔  quill editor - ul, li  🍔
      
        Don't know the purpose of the data-checked!
      */ ''}
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



      ${/* 🍔 quill editor -  Text Align & Direction 🍔 */ ''}

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


      

      ${/* 🍔 quill editor -  Indent 🍔 */ ''}

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
      



    ${/* 🍔 quill editor - blockquote 🍔 */ ''}

    .ql-editor blockquote {
        border-left: 4px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.grey[700] };
        margin-bottom: 5px;
        margin-top: 5px;
        padding-left: 16px;

        font-size: ${theme.typography.subtitle2.fontSize};
        font-weight: ${theme.typography.subtitle2.fontWeight};
        font-family: ${theme.typography.subtitle2.fontFamily};
        line-height: ${theme.typography.subtitle2.lineHeight};
        letter-spacing: ${theme.typography.subtitle2.letterSpacing};
    }



    ${/* 🍔  quill editor - code-block 🍔 */ ''}
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
        background-color: ${theme.palette.grey[900]};
        color: ${theme.palette.grey[100]};;
        overflow: visible;


        font-size: ${theme.typography.body2.fontSize};
        font-weight: ${theme.typography.body2.fontWeight};
        font-family: ${theme.typography.body2.fontFamily};
        line-height: ${theme.typography.body2.lineHeight};
        letter-spacing: ${theme.typography.body2.letterSpacing};
    }



    ${/* 🍔 quill editor -  Inserted Image🍔 */ ''}
    .ql-snow .ql-editor img {

        ${/* when we resize image, there should be a limitation */ ''}
        max-width: 90%;
        min-width: 100px;
    }

 
    ${/* 🍔 quill editor -  Inserted Link🍔 */ ''}
    .ql-snow .ql-editor a {
        text-decoration: underline;
    }

    .ql-snow a {
        color: ${theme.palette.info.main};
    }


    ${/* 🍔 quill editor -  Embedded Video 🍔 */ ''}
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




      ${/* 🍔 quill tooltip 🍔 

      - tooltip is actually a modal
      - tooltip is needed for link, video and formula
      
     */''}


     .ql-snow .ql-tooltip {
        background-color: ${theme.palette.background.paper};
        color: ${theme.palette.text.primary};
        border: 1px solid ${theme.palette.primary.dark};
        box-shadow: 0px 0px 5px  ${theme.palette.primary.dark};
        padding: 0.5rem 1rem;
        white-space: nowrap;
        z-index: 10;
      }

      ${/* tooltip - visibility */''}
      .ql-container.ql-disabled .ql-tooltip {
        visibility: hidden;
      }

      ${/* tooltip - position */''}
      .ql-snow .ql-tooltip {
        position: absolute;
        transform: translateY(10px);
      }

      
      ${/* tooltip - transform */''}
      .ql-snow .ql-tooltip.ql-flip {
        transform: translateY(-10px);
      }

      ${/* tooltip - style for <a/> tag */''}
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


    ${/* tooltip - 'Visit URL' text */''}

    .ql-tooltip::before {
        content: "Visit URL:";
        line-height: 26px;
        margin-right: 8px;
        color: ${theme.palette.text.primary};
    }

    ${/* tooltip - 'Edit' button */''}
    .ql-snow .ql-tooltip a.ql-action::after {
        border-right: 1px solid ${theme.palette.divider};
        color: ${theme.palette.text.primary};
        content: 'Edit';
        margin-left: 16px;
        padding-right: 8px;
    }


    ${/* tooltip - 'Remove' button */''}
    .ql-snow .ql-tooltip a.ql-remove::before {
        content: 'Remove';
        margin-left: 8px;
        color: ${theme.palette.primary.main};
    }





    ${/* Input field for editing the inserted link */''}

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





    ${/* 🔖Why do we need to style clipboard?

    🍗 by default, there is a quill clipboard element. It has .ql-clipboard class. It's actually a sibling element of the .ql-container element. 

    🍗 quill clipboard is meant to be hidden

    🍗 the following styles are making sure that the clipboard is hidden, if we don't use the following styles, we will see an additional input field after the editor! 

    */''}
    
    ${/* 🍔 quill clipboard 🍔 */''}
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
  



    ${/* 🍔 quill container - Don't know the purpose of the following styles! 🍔 */''}

    .ql-container {
        box-sizing: border-box;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 100%;
        margin: 0px;
        position: relative;
    }

    .ql-container.ql-snow {
        ${/* don't want this border*/''}
        border: 0px solid #ccc;
    }

    .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
        pointer-events: none;
    }



    ${/* 🍔 quill snow - Don't know the purpose of the following styles! 🍔 */''}
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

    


      ${/* 🍔 Don't know the purpose of the following styles- Just having them because they were in the quill.snow.css and looked like they are related to quill editor! 🍔 */''}

      .ql-editor .ql-bg-black {
        background-color: #000;
      }
      .ql-editor .ql-bg-red {
        background-color: #e60000;
      }
      .ql-editor .ql-bg-orange {
        background-color: #f90;
      }
      .ql-editor .ql-bg-yellow {
        background-color: #ff0;
      }
      .ql-editor .ql-bg-green {
        background-color: #008a00;
      }
      .ql-editor .ql-bg-blue {
        background-color: #06c;
      }
      .ql-editor .ql-bg-purple {
        background-color: #93f;
      }
      .ql-editor .ql-color-white {
        color: #fff;
      }
      .ql-editor .ql-color-red {
        color: #e60000;
      }
      .ql-editor .ql-color-orange {
        color: #f90;
      }
      .ql-editor .ql-color-yellow {
        color: #ff0;
      }
      .ql-editor .ql-color-green {
        color: #008a00;
      }
      .ql-editor .ql-color-blue {
        color: #06c;
      }
      .ql-editor .ql-color-purple {
        color: #93f;
      }










      ${/* 🍔 custom - the following classes are necessary for resizing image  🍔 
      

       I have tested all the following classes. How did I test?

       when I was selecting, 'xs' as the size of the image. That would put '.ql-image-size-xs' class on the image. So, I would check how the image is looking on different screen size when it is xs.

       Similarly, I checked for 'sm', 'md', 'lg' and 'xl'
       

      */''}

      .ql-editor .ql-image-size-xs{

            ${media_queries.name_xs_sm_md_lg_xl('width', '35%', '25%', '20%', '15%', '10%')}
        }


      .ql-editor .ql-image-size-sm{

            ${media_queries.name_xs_sm_md_lg_xl('width', '45%', '35%', '30%', '25%', '20%')}
        }


       .ql-editor .ql-image-size-md{

            ${media_queries.name_xs_sm_md_lg_xl('width', '60%', '45%', '40%', '35%', '30%')}
        }


        .ql-editor .ql-image-size-lg{

            ${media_queries.name_xs_sm_md_lg_xl('width', '75%', '55%', '50%', '45%', '40%')}
        }


        .ql-editor .ql-image-size-xl{

            ${media_queries.name_xs_sm_md_lg_xl('width', '90%', '65%', '60%', '55%', '50%')}
        }







        ${/* 🍔 custom - the following classes are necessary for aligning image  🍔 */ ''}

        .ql-editor .ql-image-align-center {

            width: 100%;
            display: flex;
            justify-content: center;
        }


        .ql-editor .ql-image-align-right {

            width: 100%;
            display: flex;
            justify-content: right;
        }


        .ql-editor .ql-image-align-left {

            width: 100%;
            display: flex;
            justify-content: left;
        }



`)




/* 🔖 Way to use the <CSS_FOR_QUILL_GENERATED_HTML___STYLED/> styled component:


<CSS_FOR_QUILL_GENERATED_HTML___STYLED 

   dangerouslySetInnerHTML={{ __html: wysiwyg_state.quill_generated_html }} 
/>

*/


const CSS_FOR_QUILL_GENERATED_HTML___STYLED = styled((props: type_of_obj_with_any_values) =>


    /* 🔖 In this  <CSS_FOR_QUILL_GENERATED_HTML___STYLED/>, we will not write any css, then what's the need of this  styled component?
    
    
    🍗 Our plan is to use all the styles of the <CSS_FOR_QUILL_EDITOR____STYLED/>  in this styled component
    
    
    🍗 We already know that we use the <CSS_FOR_QUILL_EDITOR____STYLED/>  as the parent component of the quill editor component. Example: 
    
         <CSS_FOR_QUILL_EDITOR____STYLED>
    
             <Box ref={quillEditorRef}></Box>
    
         </CSS_FOR_QUILL_EDITOR____STYLED>
    
    
    🍗 The above setup for <CSS_FOR_QUILL_EDITOR____STYLED/> automatically creates two extra div for the quill editor with specific className(check in the browser by inspecting): 
    
        <div> 
        
            <div className='ql-container ql-snow'>
    
                <div className='ql-editor'> </div>
                
            </div>
        
        </div>
    
    
    🍗 As we want the all styles of the <CSS_FOR_QUILL_EDITOR____STYLED/> in the <CSS_FOR_QUILL_GENERATED_HTML___STYLED/>, we must need to add these auto generated classNames & div in our <CSS_FOR_QUILL_GENERATED_HTML___STYLED/> styled component. To do that, we need to have the following setup: 
    
        <CSS_FOR_QUILL_EDITOR____STYLED   sx={(theme) => ({
               
              //Override any style of the <CSS_FOR_QUILL_EDITOR____STYLED/> here in the sx
    
              
    
         })}>
    
            <div className='ql-container ql-snow'>
    
                <div className='ql-editor'>
    
                <div {...props}></div>
    
                </div>
    
            </div>
        </CSS_FOR_QUILL_EDITOR____STYLED>
    
    */


    <CSS_FOR_QUILL_EDITOR____STYLED sx={(theme) => ({
        /*Override any style of the <CSS_FOR_QUILL_EDITOR____STYLED/> here in the sx */


        '.ql-editor': {
            backgroundColor: theme.palette.background.default
        }


    })}>

        <div className='ql-container ql-snow'>

            <div className='ql-editor'>

                <div {...props}></div>

            </div>

        </div>
    </CSS_FOR_QUILL_EDITOR____STYLED>




)(({ theme }) => `

   ${/* 
   
     Don't write any CSS here, it may not work properly. 
   
   
   */''}
`)






export {
    MODAL_CONTENT___STYLED,
    SELECT___STYLED,
    MENU_ITEM___STYLED,
    WRAPPER_OF_FORM___STYLED,
    WRAPPER_OF_FORM_CONTENT___STYLED,

    CSS_FOR_QUILL_EDITOR____STYLED,
    CSS_FOR_QUILL_GENERATED_HTML___STYLED,
}