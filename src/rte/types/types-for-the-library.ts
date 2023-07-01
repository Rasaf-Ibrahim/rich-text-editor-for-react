
export type type_of_wysiwyg_state = {

    quill_generated_html: string

    editor_cursor: {
      position: number
      selection_length: number
    }

    images: {
      last_uploaded_image_link: string
      all_uploaded_images_info: any[]
      all_uploaded_images_link: string[]
      all_inserted_images_link: string[]
      all_removed_images_link: string[]
    }

    formats_of_selected_text: {
      header?: number
      font?: string
      bold?: boolean
      italic?: boolean
      underline?: boolean
      strike?: boolean
      list?: 'ordered' | 'bullet' | 'none'
      align?: boolean
      indent?: number
      direction?: 'rtl' | 'ltr'
      blockquote?: boolean
      'code-block'?: boolean,
      color?: string,
      background?: string,
      link?: string
      script?: 'sub' | 'super'  | 'none'
    }

  }
  


export type type_of_toolbar_option_component_props = {

    quillRef: any,
    wysiwyg_initial_state: type_of_wysiwyg_state,
    wysiwyg_state: type_of_wysiwyg_state
    update_wysiwyg_state: type_of_func_prop_with_no_rule
}



