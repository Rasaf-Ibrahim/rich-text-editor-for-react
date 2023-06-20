/*__________________________________________

 ✅ import
____________________________________________*/

import React from 'react'

// hook
import { useUpdateEffect } from "react-use";
import { useImmer } from "use-immer";



// icons
import YouTube from "@mui/icons-material/YouTube";



// styled components
import {
    MODAL_CONTENT___STYLED,
} from "../styled-components/styled-components";


// mui components
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

import Modal from  '@mui/material/Modal'
import Tooltip from  '@mui/material/Tooltip'

import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'



/*__________________________________________

 ✅ types
____________________________________________*/

type type_of_embed_youtube_video_props = {

    quillRef: any
    wysiwyg_state: any
    update_wysiwyg_state: type_of_func_prop_with_no_rule
}


/*__________________________________________

 ✅ Functional Component
____________________________________________*/


export default function EMBED_YOUTUBE_VIDEO___COMPONENT(props: type_of_embed_youtube_video_props){



    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props


    // state to handle all the possible changes of this component
    const initial_state = {

        open_modal: false,

        link: '',

        valid_link: true,

        trigger_video_embed_process: false,


        /* 🔖 Storing the cursor position in the next property because there is an issue with video embedding. 
        
        - When I am embedding a video, the cursor position in the editor is becoming NaN. (wysiwyg_state.editor_cursor.position = NaN)

        - I have tried 4 different methods of video embedding but the same issue was occurring every time.  

        - To fix this issue, the current cursor position is tracked and stored in the following `remembering_cursor_position` when the  modal of this component is opened. 

        - Once the video is embedded, using this 'remembering_cursor_position' property to  restore the cursor position by updating 'wysiwyg_state.editor_cursor.position' */

        remembering_cursor_position: 0,
    }


    const [video_state, update_video_state] = useImmer(initial_state)



    // regex to check valid youtube video link
    const youtube_video_link_regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:.*)$/;



    /* when a user clicks on the toolbar's embed video icon button,  the following function gets triggered */
    const handle_click_on_the_button = () => {


        /* 🔖  'quillRef.current.focus()' has solved a bug:
        
            - After the component renders, before even touching the editor, if a user click on the video embed button and embeds a video, the cursor was putting itself in the wrong place.
            
            - I tried to fix this issue but couldn't. I was using quill's 'setSelection' function to put the cursor in the right position, this was updating the value of 'wysiwyg_state.editor_cursor.position' correctly but the cursor was putting itself in the wrong place! 

            - Now, I am using quill's 'focus' function, this function helps to focus the editor and restores its last range, even if the user hasn't touched the editor once yet, this function will put the cursor at the position 0. This is solving the issue that I was having. 
        
        */

        /* focus to the editor when the button is clicked, regardless of whether it already has focus or not */
        quillRef.current.focus()

        /* open the modal */
        update_video_state(draft => {
            draft.open_modal = true
        })
    }


    /* when a user types something in the input box of the modal, the following function gets triggered */
    const handle_input_change = (e) => {

        update_video_state(draft => {
            draft.link = e.target.value;
        })
    }


    /*  when a user submits the link, the following function gets triggered */
    const handle_submit = (event) => {

        // Prevent the default form submission behavior
        event.preventDefault()


        function is_valid_video_link(link) {
            /* as we are just accepting youtube video, we are just using regex which checks youtube's link */

            return youtube_video_link_regex.test(link)
        }



        /* 
        - if the link is not a valid link, we will change the value of the 'valid_link' property of the 'video_state'. 
        - We will also return from this 'handle_submit' function 
        */
        if (!is_valid_video_link(video_state.link.trim())) {

            update_video_state(draft => {
                draft.valid_link = false;
            })

            return
        }




        // if the link is valid, the following code will run 
        // updating the state
        update_video_state(draft => {

            draft.valid_link = true;

            draft.trigger_video_embed_process = !draft.trigger_video_embed_process

            // closing the modal
            draft.open_modal = false;
        })

    }



    /*  when the user closes the modal or when the modal automatically gets closed, the following function gets triggered */
    const handle_modal_close = () => {


        // when the modal closes, we don't want to do anything other than closing the modal!
        update_video_state(draft => {
            draft.open_modal = false
        })
    }



    /*
        - updating the value of 'remembering_cursor_position' 'video_state' state
        
        - when 'open_modal' value of the 'video_state' state changes, the following effect occurs
    */
    useUpdateEffect(() => {

        // only when the modal is open, we want to update the value
        if (video_state.open_modal) {

            update_video_state(draft => {
                draft.remembering_cursor_position = wysiwyg_state.editor_cursor.position
            })
        }

    }, [video_state.open_modal])





    /*
        - embedding the video on the editor 
        
        - when the 'trigger_video_embed_process' value of the 'video_state' state, the following effect occurs 
    */
    useUpdateEffect(() => {

        if (quillRef.current) {


            /* 🔖 It's just not enough to check that the link is valid or not. We will need to convert the link so that it can be embedded. Because to embed a video, there is special format of the link which we need to follow.*/

            const original_link = video_state.link
            const video_id = original_link.match(youtube_video_link_regex)[1];
            const embed_link = `https://www.youtube.com/embed/${video_id}`

            // embedding the video
            quillRef.current.clipboard.dangerouslyPasteHTML(
                wysiwyg_state.editor_cursor.position,


                `<iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="${embed_link}"></iframe>`
            )


            /* updating the cursor position */
            update_wysiwyg_state(draft => {
                draft.editor_cursor.position = video_state.remembering_cursor_position + 1
            })

            //  moving the cursor after the embedded video
            quillRef.current.setSelection(video_state.remembering_cursor_position + 1)





            /* after the video is embedded, cleaning the input field in the modal */

            /* 🔖 Don't try to just update the whole state to the initial state when video is embedded successfully, 
            
  
            update_video_state(initial_state)
            
            
            If you do this, then the application will crash because, the above update will also update the dependency of this useUpdateEffect. 
            
            */
            update_video_state(draft => {

                draft.link = ''

            })


        }


    }, [video_state.trigger_video_embed_process])






    return (
        <>
            <Tooltip title="Embed Youtube Video" placement="top">

                <FormControl margin='dense'>

                    <IconButton onClick={handle_click_on_the_button} >

                        <YouTube sx={(theme) => ({
                            fontSize: '1.2rem'
                        })} />

                    </IconButton>

                </FormControl>

            </Tooltip>




            <Modal open={video_state.open_modal} onClose={handle_modal_close}>

                <MODAL_CONTENT___STYLED>

                    <Box component='form' onSubmit={handle_submit}
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

                        <TextField
                            label="URL Link"
                            variant="outlined"
                            value={video_state.link}
                            onChange={handle_input_change}
                            size='small'
                        />

                        <Button type="submit" variant="contained" size='small' >
                            Submit
                        </Button>

                        {video_state.valid_link === false &&

                            <Typography variant='body2' color='error.main'>Provide a valid video link of youtube.</Typography>

                        }

                    </Box>

                </MODAL_CONTENT___STYLED>

            </Modal>

        </>
    )
}
