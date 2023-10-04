/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'


// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';


// nanoid
import { nanoid } from '../../../../dependencies/nanoid/nanoid'


// hook
import { useEffect } from 'react'
import { useImmer } from "../../../../dependencies/use-immer/use-immer"

// icons
import { YouTube } from '../../../../dependencies/mui/icons';


// mui components
import {
    Box,
    Paper,
    Typography,
    Button,
    IconButton,
    FormControl,
    TextField,
    Tooltip
} from '../../../../dependencies/mui/components'


// styled components
import { MODAL_WRAPPER_OF_CONTENT___STYLED } from '../styled-components/styled-components'


// reusable components
import MODAL___REUSABLE from '../reusable-components/modal';
import MODAL_CLOSE_BUTTON___REUSABLE from '../reusable-components/modal-close-button';
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';



/*__________________________________________

 ✅ Functional Component
____________________________________________*/


export default function EMBED_VIDEO___COMPONENT(props: type_of_toolbar_option_component_props) {



    // 🍪 props
    const { quillRef, rte_state, update_rte_state } = props


    // state to handle all the possible changes of this component
    const initial_state = {

        open_modal: false,

        link: '',

        valid_link: true,

        trigger_video_embed_process: '',

        remembering_cursor_position: 0,

        remembering_vertical_scroll_position: 0


        /* 🔖 Why are we storing the cursor position & vertical scroll position?

        
            - After embedding a video the cursor position in the editor is becoming NaN. (rte_state.editor_cursor.position = NaN).

            - Also, after embedding a video, screen is scrolling to the top.

            - I tried to prevent the above 2 issues but I have failed to prevent


            - So, to solve the above 2 issues, just before embedding the video, I am storing "cursor position" & "vertical scroll position" 

            - And just before the video is embedded, updating the cursor position and scroll position from the stored value
        */
    }



    const [video_state, update_video_state] = useImmer(initial_state)


    // regex to check valid video link
    const valid_url_regex = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/



    /* when a user clicks on the toolbar's embed video icon button,  the following function gets triggered */
    const handle_click_on_the_button = () => {


        /* 🔖  'quillRef.current.focus()' has solved a bug:
        
            - After the component renders, before even touching the editor, if a user click on the video embed button and embeds a video, the cursor was putting itself in the wrong place.
            
            - I tried to fix this issue but couldn't. I was using quill's 'setSelection' function to put the cursor in the right position, this was updating the value of 'rte_state.editor_cursor.position' correctly but the cursor was putting itself in the wrong place! 

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

        // prevent the default form submission behavior
        event.preventDefault()


        // validating the link
        function is_valid_video_link(link) {

            return valid_url_regex.test(link)
        }



        /* 
            - if the link is not a valid link, we will change the value of the 'valid_link' property of the 'video_state'. 
            - We will also return from this 'handle_submit' function 
        */
        if (!is_valid_video_link(video_state.link.trim())) {

            update_video_state(draft => {
                draft.valid_link = false
            })

            return
        }


        // if the link is valid, we can embed the video. But before we embed the video, we must remember the cursor and scroll position.
        update_video_state(draft => {
            draft.remembering_cursor_position = rte_state.editor_cursor.position,

            draft.remembering_vertical_scroll_position = window.scrollY
        })


        // to embed the video, we must update the following state      
        update_video_state(draft => {

            draft.valid_link = true;

            draft.trigger_video_embed_process = nanoid(8)

            // closing the modal
            draft.open_modal = false;
        })

    }



    /*  when the user closes the modal or when the modal automatically gets closed, the following function gets triggered */
    const handle_modal_close = () => {

        update_video_state(draft => {
            draft.open_modal = false

            draft.valid_link = true
        })
    }


    /*
        - embedding the video on the editor 
        
        - 'video_state.trigger_video_embed_process' is the dependency of the following effect  
    */
    useEffect(() => {

        if(video_state.trigger_video_embed_process === '') return

        
        let value = {
            url: video_state.link,
        }

        quillRef.current.insertEmbed(
            rte_state.editor_cursor.position,
            'iframe_custom_blot',
            value
        )

        // restore the scroll position 
        window.scrollTo(0, video_state.remembering_vertical_scroll_position)


        // updating the cursor position 
        update_rte_state(draft => {
            draft.editor_cursor.position = video_state.remembering_cursor_position + 1
        })

        // move the cursor after the embedded video
        quillRef.current.setSelection(video_state.remembering_cursor_position + 1)




        /* After the video is embedded, cleaning the input field in the modal */
        update_video_state(draft => {
            draft.link = ''
        })


    }, [video_state.trigger_video_embed_process])





    // TSX
    return (
        <>
            <Tooltip title="Embed Video" placement="top">

                <FormControl margin='dense'>

                    <IconButton onClick={handle_click_on_the_button} size='small'>

                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={YouTube}
                        />

                    </IconButton>

                </FormControl>

            </Tooltip>



            <MODAL___REUSABLE

                modal_is_open={video_state.open_modal}

                user_can_close_the_modal={true}

                handle_close_modal={handle_modal_close}

                modal_content_jsx={

                    <MODAL_CONTENT___CHILD
                        handle_submit={handle_submit}
                        video_state={video_state}
                        handle_input_change={handle_input_change}
                    />
                }


                modal_navbar_jsx={

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>

                        <YouTube sx={{ fontSize: '1.3rem' }} />

                        <Typography sx={{
                            typography: 'body1', textAlign: 'center',
                            fontWeight: 600
                        }}>
                            Embed Video
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
 <EMBED_VIDEO___COMPONENT/>
____________________________________________*/

function MODAL_CONTENT___CHILD({ handle_submit, video_state, handle_input_change }) {




    return (

        <MODAL_WRAPPER_OF_CONTENT___STYLED
            component='form'
            onSubmit={handle_submit}>


            <TextField
                label="URL Link"
                variant="filled"
                value={video_state.link}
                onChange={handle_input_change}
                size='small'
            />

            <Button type="submit" variant="contained" size='small' >
                Submit
            </Button>


            {video_state.valid_link === false &&
                <Typography variant='body2' color='error.main'>Provide a valid link</Typography>
            }



            {/* Instructions */}
            <Box sx={{ marginTop: '1rem' }}>
                <MODAL_INSTRUCTIONS___CHILD />
            </Box>



        </MODAL_WRAPPER_OF_CONTENT___STYLED>

    )


}




function MODAL_INSTRUCTIONS___CHILD() {

    return (

        <Paper elevation={1} sx={{ padding: '1rem' }}>

            <Typography variant="body1" sx={{ fontWeight: 600, textAlign: 'center', marginBottom: '1rem' }}>
                Instruction
            </Typography>


            <Typography variant="subtitle2" gutterBottom>
                Please provide video links in their embeddable format from any platform. For reference, here are a few examples:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.5rem' }}>

                <Typography variant="subtitle2">
                    - YouTube: <code>https://www.youtube.com/embed/VIDEO_ID</code>
                </Typography>

                <Typography variant="subtitle2">
                    - Rumble: <code>https://rumble.com/embed/VIDEO_ID</code>
                </Typography>

            </Box>

        </Paper>
    )
}