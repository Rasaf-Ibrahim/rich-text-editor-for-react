/*__________________________________________

 ✅ import
____________________________________________*/

import React from 'react'

// hook
import { useUpdateEffect } from "react-use";
import { useImmer } from "use-immer";


// type
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// icons
import { AspectRatioRounded, EditIcon } from '../mui/icons';

// mui components
import {
    Box,
    Typography,
    Button,
    IconButton,
    FormControl,
    Tooltip,
    Badge
} from '../mui/components'

// styled components
import { MODAL_WRAPPER_OF_CONTENT___STYLED } from '../styled-components/styled-components'

// util
import { align_children, type_of_align } from '../utils/align-children';


// reusable components
import MODAL___REUSABLE from '../reusable-components/modal';
import MODAL_CLOSE_BUTTON___REUSABLE from '../reusable-components/modal-close-button';
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';






/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function IMAGE_EDIT___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props


    // 🫓 state to handle all the possible changes of this component
    const initial_state = {

        open_edit_image_modal: false,

        image_is_selected: false,

        image_current_size: null,

        image_current_align: null,

        image_has_been_edited: false,

    }


    const [image_state, update_image_state] = useImmer(initial_state)



    // useLogger(' ✔️imageState', image_state)



    //  🫓 updating "image_is_selected" property of the state
    useUpdateEffect(() => {

        const [leaf] = quillRef.current.getLeaf(rte_state.editor_cursor.position)

        const element = leaf && leaf.domNode

        // const parentElement = element?.parentElement

        // console.log('parentElement', parentElement)


        if (element && element.tagName === 'IMG') {

            update_image_state(draft => {
                draft.image_is_selected = true
            })

        }


        else if (element && element.tagName !== 'IMG') {

            update_image_state(draft => {
                draft.image_is_selected = false
            })

        }


    }, [rte_state.editor_cursor.position])






    //  🫓 updating "image_current_size" & "image_current_align" properties of the state when modal is open or image is edited
    useUpdateEffect(() => {

        // 🥔 if the modal is not open, return
        if (!image_state.open_edit_image_modal) return


        // 🥔 getting the element and parent element
        const [leaf] = quillRef.current.getLeaf(rte_state.editor_cursor.position)

        const element = leaf && leaf.domNode

        const parentElement = element?.parentElement


        // 🥔 if the element is not an image, return 
        if (element && element.tagName !== 'IMG') return


        // 🥔 image current size
        const elementClassNames = element?.classList

        let imageCurrentSize = ''

        for (const className of elementClassNames) {

            if (className.startsWith('ql-image-size-')) {

                imageCurrentSize = className.substring('ql-image-size-'.length)

                break
            }
        }



        // 🥔 image current align
        const parentElementClassNames = parentElement.classList

        let imageCurrentAlign = ''

        for (const className of parentElementClassNames) {

            if (className.startsWith('ql-custom-align-')) {

                imageCurrentAlign = className.substring('ql-custom-align-'.length)

                break
            }
        }



        //  🥔 updating state
        update_image_state(draft => {
            draft.image_current_size = imageCurrentSize
            draft.image_current_align = imageCurrentAlign
        })


        // 🥔 initially, 'imageCurrentAlign' is empty string, then set it 'left'
        if (imageCurrentAlign === '') {
            update_image_state(draft => {
                draft.image_current_align = 'left'
            })
        }



    }, [image_state.open_edit_image_modal, image_state.image_has_been_edited])







    // 🫓 handle click on the edit image toolbar button
    const handle_click_on_the_button = () => {


        update_image_state(draft => {
            draft.open_edit_image_modal = true
        })

    }





    // 🫓 handle modal close
    const handle_modal_close = () => {

        update_image_state(draft => {
            draft.open_edit_image_modal = false
        })

    }



    // ✅ JSX
    return (
        <>


            <Tooltip title="Edit Image" placement="top">

                <FormControl margin='dense'>

                    {/* Badge should be placed as the wrapper of the icon. Alternatively, if we wrap the <FormControl/> with badge, then the badge will be visible far from the icon which we don't want. */}
                    <Badge
                        invisible={!image_state.image_is_selected}
                        badgeContent='Edit'
                        color="primary">

                        <IconButton onClick={handle_click_on_the_button} >


                            <MUI_ICON___REUSABLE
                                ICON_COMPONENT={AspectRatioRounded}
                                condition_to_use_primary_color={image_state.image_is_selected}
                            />


                        </IconButton>

                    </Badge>

                </FormControl>


            </Tooltip>




            <MODAL___REUSABLE
                modal_is_open={image_state.open_edit_image_modal}

                user_can_close_the_modal={true}

                handle_close_modal={handle_modal_close}

                modal_content_jsx={
                    <MODAL_CONTENT___CHILD
                        image_state={image_state}
                        update_image_state={update_image_state}
                        quillRef={quillRef}
                        rte_state={rte_state}
                    />
                }

                modal_navbar_jsx={

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>

                        {/* This icon is not for the toolbar. So, we are not using "MUI_ICON___REUSABLE"   */}
                        <EditIcon sx={{ fontSize: '1.3rem' }} />

                        <Typography sx={{
                            typography: 'body1', textAlign: 'center',
                            fontWeight: 600
                        }}>
                            Edit Image
                        </Typography>

                    </Box>
                }



                modal_footer_jsx={

                    <MODAL_CLOSE_BUTTON___REUSABLE handle_modal_close={handle_modal_close} />
                }

            />

        </>
    )
}






/*__________________________________________

 ✅ Child Component of 
 <IMAGE_EDIT___COMPONENT/>
____________________________________________*/

function MODAL_CONTENT___CHILD({ image_state, update_image_state, quillRef, rte_state }) {


    return (


        <MODAL_WRAPPER_OF_CONTENT___STYLED sx={{ paddingTop: '0rem' }}>


            {image_state.image_is_selected ?


                <>

                    <RESIZE_IMAGE___CHILD
                        image_state={image_state}
                        update_image_state={update_image_state}
                        quillRef={quillRef}
                        rte_state={rte_state} />

                    <ALIGN_IMAGE___CHILD
                        image_state={image_state}
                        update_image_state={update_image_state}
                        quillRef={quillRef}
                        rte_state={rte_state} />

                </>


                :


                <Typography
                    variant='body2'
                    sx={{ padding: '1.5rem', textAlign: 'center' }}>

                    Please click next to an image before attempting to edit it. When you click beside an image, the edit image button in the toolbar will change its color, indicating that the image is now editable.
                </Typography>


            }



        </MODAL_WRAPPER_OF_CONTENT___STYLED>


    )
}






/*__________________________________________

 ✅ Child Component of 
 <MODAL_CONTENT___CHILD/>
____________________________________________*/

function RESIZE_IMAGE___CHILD({ image_state, update_image_state, quillRef, rte_state }) {



    // 🫓 resize function
    type type_of_size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

    function resize(size: type_of_size) {

        const [leaf] = quillRef.current.getLeaf(rte_state.editor_cursor.position)

        const element = leaf && leaf.domNode



        function remove_ql_image_size_class() {

            // Remove remove existing classes starting with "ql-image"

            let classes = element.className.split(" ")
            for (let i = 0; i < classes?.length; i++) {
                if (classes[i].startsWith("ql-image-size")) {
                    element?.classList.remove(classes[i])
                }
            }
        }





        // 🥔 resize to 'xs'
        if (size === 'xs') {

            remove_ql_image_size_class()

            element.classList.add("ql-image-size-xs")

            update_image_state(draft => {
                draft.image_has_been_edited = !draft.image_has_been_edited
            })
        }


        // 🥔 resize to 'sm'
        else if (size === 'sm') {
            remove_ql_image_size_class()

            element.classList.add("ql-image-size-sm")

            update_image_state(draft => {
                draft.image_has_been_edited = !draft.image_has_been_edited
            })
        }


        // 🥔 resize to 'md'
        else if (size === 'md') {
            remove_ql_image_size_class()

            element.classList.add("ql-image-size-md")

            update_image_state(draft => {
                draft.image_has_been_edited = !draft.image_has_been_edited
            })
        }


        // 🥔 resize to 'lg'
        else if (size === 'lg') {
            remove_ql_image_size_class()

            element.classList.add("ql-image-size-lg")

            update_image_state(draft => {
                draft.image_has_been_edited = !draft.image_has_been_edited
            })
        }


        // 🥔 resize to 'xl'
        else if (size === 'xl') {
            remove_ql_image_size_class()

            element.classList.add("ql-image-size-xl")

            update_image_state(draft => {
                draft.image_has_been_edited = !draft.image_has_been_edited
            })
        }


         // 🥔 resize to '2xl'
         else if (size === '2xl') {
            remove_ql_image_size_class()

            element.classList.add("ql-image-size-2xl")

            update_image_state(draft => {
                draft.image_has_been_edited = !draft.image_has_been_edited
            })
        }


         // 🥔 resize to '3xl'
         else if (size === '3xl') {
            remove_ql_image_size_class()

            element.classList.add("ql-image-size-3xl")

            update_image_state(draft => {
                draft.image_has_been_edited = !draft.image_has_been_edited
            })
        }

    }







    // ✅ JSX
    return (

        <WRAPPER_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>

            <TITLE_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>
                Resize
            </TITLE_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>



            <WRAPPER_OF_THE_OPTIONS_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>



                <Button onClick={() => resize('xs')} disabled={image_state.image_current_size === 'xs'}>
                    xs
                </Button>

                <Button onClick={() => resize('sm')} disabled={image_state.image_current_size === 'sm'}>
                    sm
                </Button>

                <Button onClick={() => resize('md')} disabled={image_state.image_current_size === 'md'}>
                    md
                </Button>

                <Button onClick={() => resize('lg')} disabled={image_state.image_current_size === 'lg'}>
                    lg
                </Button>

                <Button onClick={() => resize('xl')} disabled={image_state.image_current_size === 'xl'}>
                    xl
                </Button>


                <Button onClick={() => resize('2xl')} disabled={image_state.image_current_size === '2xl'}>
                    2xl
                </Button>

                <Button onClick={() => resize('3xl')} disabled={image_state.image_current_size === '3xl'}>
                    3xl
                </Button>

            </WRAPPER_OF_THE_OPTIONS_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>

        </WRAPPER_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>

    )
}









/*__________________________________________

 ✅ Child Component of 
 <MODAL_CONTENT___CHILD/>
____________________________________________*/

function ALIGN_IMAGE___CHILD({ image_state, update_image_state, quillRef, rte_state }) {


    // 🫓 align_image function


    function align_image(align: type_of_align) {

        align_children({
            selected_align: align,
            quillRef: quillRef,
            rte_state: rte_state
        })

        update_image_state(draft => {
            draft.image_has_been_edited = !draft.image_has_been_edited
        })
    }


    // ✅ JSX
    return (

        <WRAPPER_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>

            <TITLE_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>
                Align
            </TITLE_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>

            <WRAPPER_OF_THE_OPTIONS_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>


                <Button onClick={() => align_image('left')} disabled={image_state.image_current_align === 'left'}>
                    left
                </Button>

                <Button onClick={() => align_image('center')} disabled={image_state.image_current_align === 'center'}>
                    center
                </Button>

                <Button onClick={() => align_image('right')} disabled={image_state.image_current_align === 'right'}>
                    right
                </Button>

            </WRAPPER_OF_THE_OPTIONS_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>

        </WRAPPER_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED>

    )
}








/*__________________________________________

 ✅ Styled Components of Multiple Components 
____________________________________________*/



// 🫓
function WRAPPER_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED({ children }) {


    return (

        <Box sx={(theme) => ({
            marginTop: '1rem',
            border: `2px solid ${theme.palette.divider}`,
            padding: '2rem'
        })}>

            {children}

        </Box>
    )
}




// 🫓
function TITLE_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED({ children }) {


    return (

        <Typography
            variant='body2'
            textAlign='center'
            sx={{ textDecoration: 'underline' }}
        >

            {children}

        </Typography>
    )
}





// 🫓
function WRAPPER_OF_THE_OPTIONS_OF_A_FEATURE_OF_EDIT_IMAGE___STYLED({ children }) {


    return (

        <Box sx={{
            marginTop: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            {children}

        </Box>
    )
}



























