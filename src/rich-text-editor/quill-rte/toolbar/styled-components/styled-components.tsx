// react
import React from 'react'

// theme hook
import { useTheme } from '@mui/material/styles'

// css in js
import css_media_queries from './media-queries';
import { styled } from '@mui/material/styles';


// mui components
import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import { type_of_rte_state } from '../../../../types/types-for-the-library';




/* 🫓 */
const MODAL_WRAPPER_OF_CONTENT___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box  {...props} />
)
    (({ theme }) => `

    min-height: 10rem;
    min-width: 15rem;

    padding-top:2rem;
    
    display: flex;
    flex-direction: column; 
    align-items: center; 
    gap: 1rem;
`)


type type_of_select_styled = {
    selected_value: string | boolean | number
    on_selection_change: type_of_func_prop_with_no_rule


    type: 'icon' | 'text'
    width_of_the_largest_item: string,
    condition_of_using_primary_color: boolean
}


function SELECT___STYLED(props: React.PropsWithChildren<type_of_select_styled>) {

    const {
        type,
        width_of_the_largest_item,
        condition_of_using_primary_color,
        on_selection_change,
        selected_value,
        children
    } = props

    const theme = useTheme()


    return (

        <Select
            value={selected_value}
            onChange={on_selection_change}
            variant="standard"
            disableUnderline

            sx={(theme) => ({


                /*🔖 Reason of using Transform:

                    - Only for few toolbar options, we are using  the <Select/> component.
                                
                    - <Select/> component has bigger padding bottom.
                                
                    - But as for most of the toolbar options, we are not using <Select/> component, this extra padding bottom is making the design Inconsistent. 

                    - To solve this, we need to use transform: 'translateY()',
                                
                    
                */

                /*🔖 Reason of using PaddingLeft & PaddingRight

                    - In the other toolbar options, there the padding left and padding right is 0.5rem. But <Select/> component doesn't have this much padding left and padding right.
                                
                    - To fix all this issues, we need to provide paddingLeft and PaddingRight.
                    
                */

                /* 🔖 Reason of using width:

                    `<Select/>` component is often used as a drop-down list in a user interface. This list could contain a variety of options for the user to select from. In this case of "font" we have three options for the type of 'font': "Sans Serif", "Serif", and "MonoSpace".

                    Each of these font types are represented as individual options (or 'menu items') within the `<Select/>` component. Importantly, the visual length of each of these options is different. "Sans Serif" is quite short, "Serif" is a bit longer, and "MonoSpace" is the longest. 

                    Here's the problem: the `<Select/>` component, by default, adjusts its width to fit the currently selected option. This means if you select "Sans Serif", the component will be shorter, and if you select "MonoSpace", it will be longer. This dynamic adjustment can lead to shifts in your user interface's layout each time a different font is selected.

                    To resolve this, we set a fixed width for the `<Select/>` component. We calculate this width based on the length of the longest option ("MonoSpace" in this case). This way, no matter which font type is selected, the `<Select/>` component maintains a consistent width.
                */


                '.MuiSelect-select': {

                    width: width_of_the_largest_item,

                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',


                    ...(type === 'text' ?

                        {
                            transform: 'translateY(3px)',

                            fontSize: theme.typography.overline.fontSize,
                            fontWeight: 600,

                            color: condition_of_using_primary_color ? theme.palette.primary.main : theme.palette.secondary.main,
                        }

                        :

                        // type === 'icon'
                        {
                            "& svg": {

                                transform: 'translateY(4px)',

                                fill: condition_of_using_primary_color ? theme.palette.primary.main : theme.palette.secondary.main,
                            }
                        }
                    ),


                },



                // this following class name is attached to the standard icon of the Select component (usually a dropdown arrow)
                '.MuiSelect-iconStandard': {
                    color: condition_of_using_primary_color ? theme.palette.primary.main : theme.palette.secondary.main,

                    transform: 'translateY(2px)',  // Adjusts the vertical position of the icon

                }



            })}



            {
            ...(type === 'icon' ? {

                MenuProps: {

                    // upon clicking the select, all the menu items become visible,  to style the container of the menu items, we need to the following code
                    MenuListProps: {
                        sx: {
                            backgroundColor: theme.palette.background.default,


                            padding: '0rem',
                            paddingTop: '0rem',
                            paddingBottom: '0rem',

                            display: 'flex',
                            flexWrap: 'wrap',
                        },
                    },
                }

            }

                :

                {}
            )
            }

        >

            {children}

        </Select>


    )


}



// const SELECT___STYLED = styled((props: type_of_obj_with_any_values) =>


//     <Select {...props} variant="standard" disableUnderline />


// )(({ theme }) => `

//    font-size: ${theme.typography.overline.fontSize};
//    font-weight:600;

//   ${/*  using the icon(secondary) color */ ''}
//   color:  ${theme.palette.secondary.main}
// `)





const MENU_ITEM___STYLED = styled((props: type_of_obj_with_any_values) =>

    <MenuItem {...props} />


)(({ theme }) => `

   color: ${theme.palette.text.primary};
   font-size: ${theme.typography.overline.fontSize};

`)







/* 🫓 */
const WRAPPER_OF_FORM___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box  {...props} />
)
    (({ theme }) => `

display:flex;
flex-direction:column;
align-items: center;
`)



/* 🫓 */
const WRAPPER_OF_FORM_CONTENT___STYLED = styled((props: type_of_obj_with_any_values) =>

    <Box  {...props} component='form' />
)
    (({ theme }) => `

    ${css_media_queries.name_xs_sm_md_lg('width', '18rem', '20rem', '22rem', '24rem')};

    ${/*when the width is increasing 2, we need to increase the padding the padding 1 because padding has right and left. */ ''}
    ${css_media_queries.name_xs_sm_md_lg('padding-right', '1rem', '2rem', '3rem', '4rem')};
    ${css_media_queries.name_xs_sm_md_lg('padding-left', '1rem', '2rem', '3rem', '4rem')};
    padding-top:1rem;
    padding-bottom:1rem;

    ${/* usually, for the form, we don't use default background color but as the form will be placed in a modal, so we are using default background color */''}
    background-color: ${theme.palette.background.default};


    ${/* Button's size is getting changed while toggling the email form if we use display:'grid' instead of display:'flex' & flex-direction:'column' */ ''}
    display: flex;
    flex-direction: column;
    justify-content: center; 
    gap: 1.2rem; 
`)



/* 🫓 */
const WRAPPER_OF_SELECTED_IMAGES___STYLED = styled(Box)
    (({ theme }) => `

    width: 100%;
    height: auto;
    padding: 1rem;

    border-width: 2px;
    border-style: dotted;
    border-color: ${theme.palette.divider};
    border-radius: 15px;
    overflow: hidden;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
`)







export {
    MODAL_WRAPPER_OF_CONTENT___STYLED,
    SELECT___STYLED,
    MENU_ITEM___STYLED,
    WRAPPER_OF_FORM___STYLED,
    WRAPPER_OF_FORM_CONTENT___STYLED,
    WRAPPER_OF_SELECTED_IMAGES___STYLED
}