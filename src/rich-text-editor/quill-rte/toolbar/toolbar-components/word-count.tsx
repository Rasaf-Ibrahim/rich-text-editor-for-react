/*__________________________________________

 ✅ import
____________________________________________*/

// react
import React from 'react'

// hook
import { useImmer } from "use-immer";

// types
import { type_of_toolbar_option_component_props } from '../../../../types/types-for-the-library';

// icons
import {
    ArticleRounded,
    ShortTextRounded,
    FormatSizeRounded,
    TextFieldsRounded
} from '../mui/icons'


// mui components
import {
    Box,
    Typography,
    IconButton,
    FormControl,
    Tooltip,
} from '../mui/components'

// reusable components
import MODAL___REUSABLE from '../reusable-components/modal';
import MODAL_CLOSE_BUTTON___REUSABLE from '../reusable-components/modal-close-button';
import MUI_ICON___REUSABLE from '../reusable-components/mui-icon';



/*__________________________________________

 ✅ Functional Component
____________________________________________*/

export default function WORD_COUNT___COMPONENT(props: type_of_toolbar_option_component_props) {


    // 🍪 props
    const { rte_state } = props

    // 🍪 state to handle all the possible changes of this component
    const initial_state = {
        open_word_count_modal: false,
    }


    const [word_count_modal_state, update_word_count_modal_state] = useImmer(initial_state)



    // 🍪 handle click on the word count toolbar button
    const handle_click_on_the_button = () => {


        update_word_count_modal_state(draft => {
            draft.open_word_count_modal = true
        })

    }



    // 🍪 handle modal close
    const handle_modal_close = () => {

        update_word_count_modal_state(draft => {
            draft.open_word_count_modal = false
        })

    }




    return (

        <>


            <Tooltip title="Word Count" placement="top">

                <FormControl margin='dense'>

                    <IconButton onClick={handle_click_on_the_button} size='small'>

                        <MUI_ICON___REUSABLE
                            ICON_COMPONENT={ArticleRounded}
                        />

                    </IconButton>


                </FormControl>


            </Tooltip>



            <MODAL___REUSABLE
                modal_is_open={word_count_modal_state.open_word_count_modal}

                user_can_close_the_modal={true}

                handle_close_modal={handle_modal_close}

                modal_navbar_jsx={

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>

                        {/* This icon is not for the toolbar. So, we are not using "MUI_ICON___REUSABLE"   */}
                        <ArticleRounded sx={{ fontSize: '1.3rem' }} />

                        <Typography sx={{
                            typography: 'body1', textAlign: 'center',
                            fontWeight: 600
                        }}>
                            Word Count
                        </Typography>

                    </Box>
                }

                modal_content_jsx={
                    <Box sx={{ maxWidth: '600px' }}>


                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', my: '1rem' }}>
                            <ShortTextRounded color='primary' />
                            <Typography variant='body1'>Total Words: <strong>{rte_state.editor_status.total_words}</strong></Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', my: '1rem' }}>
                            <TextFieldsRounded color='primary' />
                            <Typography variant='body1'>Total Characters: <strong>{rte_state.editor_status.total_characters}</strong></Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', my: '1rem' }}>
                            <FormatSizeRounded color='primary' />
                            <Typography variant='body1'>Total Characters Excluding Spacing: <strong>{rte_state.editor_status.total_characters_excluding_spacing}</strong></Typography>
                        </Box>



                    </Box>
                }


                modal_footer_jsx={

                    <MODAL_CLOSE_BUTTON___REUSABLE handle_modal_close={handle_modal_close} />
                }

            />

        </>

    )





}