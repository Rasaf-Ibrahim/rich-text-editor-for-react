/*__________________________________________

 ✅ import
____________________________________________*/

import React from 'react'

// hook
import { useImmer } from "use-immer";


// type
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';

// icons
import { LinkRounded } from '../mui/icons';


// mui components
import {
    Box,
    Typography,
    Button,
    IconButton,
    FormControl,
    TextField,
    Tooltip
} from '../mui/components'

// styled components
import { MODAL_WRAPPER_OF_CONTENT___STYLED } from '../styled-components/styled-components'

// reusable components
import MODAL___REUSABLE from '../reusable-components/modal';
import MODAL_CLOSE_BUTTON___REUSABLE from '../reusable-components/modal-close-button';
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';



/*__________________________________________

 ✅ Functional Component 
____________________________________________*/

export default function LINK___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🫓 props
    const { quillRef, rte_state, update_rte_state } = props



    // state to handle all the possible changes of this component
    const initial_state = {

        open_modal: false,

        text_is_selected: false,

        link_already_exist: false,

        link: ''
    }


    const [link_state, update_link_state] = useImmer(initial_state)



    const handle_click_on_the_link_button = () => {

        // if link already exists
        if (rte_state.formats_of_selected_text.link.length > 0) {

            update_link_state(draft => {
                draft.link_already_exist = true
                draft.open_modal = true
            })

        }

        // if link doesn't already exist
        else {


            const selected_text = quillRef.current.getSelection()

            // check if the user has selected any text or not
            if (selected_text && selected_text.length > 0) {

                update_link_state(draft => {
                    draft.text_is_selected = true
                    draft.open_modal = true
                })

            }

            // if user haven't selected any text
            else {
                update_link_state(draft => {
                    draft.text_is_selected = false
                    draft.open_modal = true
                })
            }

        }


    }


    const handle_input_change = (e) => {

        update_link_state(draft => {
            draft.link = e.target.value;
        })
    }


    //  when a user submits the link, the following function gets triggered
    const handle_submit = () => {

        // Prevent the default form submission behavior
        event.preventDefault()

        quillRef.current.format('link', link_state.link)

        update_rte_state(draft => {

            draft.formats_of_selected_text.link = link_state.link
        })


        update_link_state(draft => {

            // closing the modal
            draft.open_modal = false

        })
    }


    const handle_modal_close = () => {

        // when the modal closes, change the state back to initial values
        update_link_state(initial_state)
    }



    return (
        <>
            <Tooltip title="Link" placement="top">

                <FormControl margin='dense'>

                    <IconButton onClick={handle_click_on_the_link_button} >

                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={LinkRounded}
                            condition_to_use_primary_color={rte_state.formats_of_selected_text.link}
                        />


                    </IconButton>

                </FormControl>

            </Tooltip>



            <MODAL___REUSABLE

                modal_is_open={link_state.open_modal}

                user_can_close_the_modal={true}

                handle_close_modal={handle_modal_close}

                modal_content_jsx={

                    <MODAL_CONTENT___CHILD
                        handle_submit={handle_submit}
                        link_state={link_state}
                        handle_input_change={handle_input_change}
                    />
                }


                modal_navbar_jsx={

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>

                        <LinkRounded sx={{ fontSize: '1.3rem' }} />

                        <Typography sx={{
                            typography: 'body1', textAlign: 'center',
                            fontWeight: 600
                        }}>
                            Link
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
 <LINK___COMPONENT/>
____________________________________________*/

function MODAL_CONTENT___CHILD({ handle_submit, link_state, handle_input_change }) {




    return (

        <MODAL_WRAPPER_OF_CONTENT___STYLED>


            {(() => {


                if (link_state.link_already_exist) {


                    return (

                        <Typography variant='body2' sx={{ textAlign: 'center' }}>Link already exists on your selected text. Just click on the text in the editor, you will get options to edit or remove the link.</Typography>
                    )

                }

                else {


                    if (link_state.text_is_selected) {


                        return (

                            <Box component='form' onSubmit={handle_submit}
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

                                <TextField
                                    label="URL Link"
                                    variant="filled"
                                    value={link_state.link}
                                    onChange={handle_input_change}
                                    size='small'
                                />

                                <Button type="submit" variant="contained" size='small' >
                                    Submit
                                </Button>

                            </Box>
                        )




                    }

                    else {


                        return (

                            <Typography variant='body2' sx={{ padding: '1rem', textAlign: 'center' }}>Please select some text before trying to insert a link.</Typography>
                        )


                    }

                }
            })()}

        </MODAL_WRAPPER_OF_CONTENT___STYLED>
    )


}

