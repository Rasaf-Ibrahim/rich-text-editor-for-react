import { ToolbarNonConditionalOptionsType, ToolbarImageCloudOptionType, ToolbarImageBase64OptionType, imageValidationType } from './types-for-the-users';


export type type_of_rte_state = {

    quill_generated_html: string


    quill_generated_html_fetched_from_database: string



    editor_cursor: {
        position: number
        selection_length: number
    },

    editor_status: {
        has_focus: boolean,
        total_words: number,
        total_characters: number,
        total_characters_excluding_spacing: number
    },

    editor_events_state: {

        // unique string every time with nanoid()

        any_change: string,

        text_change: string,

        selection_change: string,

        image_inserted: string,

        image_removed: string,

        image_with_blob_src_inserted: string,

        image_with_blob_src_removed: string,

        image_with_url_src_inserted: string,

        image_with_url_src_removed: string

    },


    images: {

        all_inserted_blob_src_image_info: {

            img_id: string,
            img_file: File

        }[],

        all_removed_url_src_image_id: string[],


        // unique string every time with nanoid()
        trigger_replacement_of_blob_with_url: string
    }



    formats_of_selected_text: {
        header?: number
        font?: string
        bold?: boolean
        italic?: boolean
        underline?: boolean
        strike?: boolean
        list?: 'ordered' | 'bullet' | 'none' | false
        align?: 'right' | 'center' | 'justify' | false /* false means left */
        indent?: number
        direction?: 'rtl' | 'ltr'
        blockquote?: boolean
        'code-block'?: boolean,
        color?: string,
        background?: string,
        link?: string
        script?: 'sub' | 'super' | 'none' | false
    }

}


export type type_of_update_rte_state = (func: (draft: type_of_rte_state) => void) => void


export type type_of_display_these_toolbar_options = Array<ToolbarNonConditionalOptionsType | ToolbarImageBase64OptionType> | Array<ToolbarNonConditionalOptionsType | ToolbarImageCloudOptionType>



export type type_of_toolbar_option_component_props = {

    quillRef: type_of_anything
    rte_initial_state: type_of_rte_state
    rte_state: type_of_rte_state

    // update_rte_state will be used in couple of components, not all
    update_rte_state: type_of_update_rte_state

    // imageValidation will just be used for 2 image upload related component
    imageValidation: imageValidationType
}





