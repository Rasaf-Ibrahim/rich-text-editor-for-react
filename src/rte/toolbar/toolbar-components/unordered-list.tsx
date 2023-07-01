/*__________________________________________

 ✅ import
____________________________________________*/
// react
import React from 'react'


// types
import { type_of_toolbar_option_component_props } from '../../types/types-for-the-library';


// icons
import { FormatListBulletedRounded } from '../mui/icons';


// mui components
import  {
    IconButton,
    FormControl,
    Tooltip,
} from '../mui/components'





/*__________________________________________

 ✅ Functional Component 
____________________________________________*/
export default function UNORDERED_LIST___COMPONENT(props:type_of_toolbar_option_component_props) {


    // 🥪 props
    const { quillRef, wysiwyg_state, update_wysiwyg_state } = props



    // 🥪 handleUnorderedList
    const handleUnorderedList = () => {

        const isBulleted = quillRef.current.getFormat().list === 'bullet'

        if (isBulleted) {
            quillRef.current.format('list', false);

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = false
            })

        }

        else {
            quillRef.current.format('list', 'bullet');

            update_wysiwyg_state(draft => {
                draft.formats_of_selected_text.list = 'bullet'
            })
        }

    }


    return (

        <Tooltip title="Bullet List" placement="top">

            <FormControl margin='dense'>

                <IconButton onClick={handleUnorderedList}>

                    <FormatListBulletedRounded sx={(theme) => ({
                        fontSize: '1.2rem',
                        color: wysiwyg_state.formats_of_selected_text.list === 'bullet' ? theme.palette.primary.dark : theme.palette.text.primary
                    })} />

                </IconButton>

            </FormControl>

        </Tooltip>
    )
}
