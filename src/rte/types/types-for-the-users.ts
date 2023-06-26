export type PrimaryColorType = 'red' | 'amber' | 'light_green' | 'cyan' | 'indigo'




export type RichTextEditorPropsType = {

    customizeUI: {
        dark: boolean,
        primaryColor: PrimaryColorType,
        stickyToolbarOnScroll?: boolean
    }

    toolbarOptions: Array<
        'clear_format' |
        'undo' |
        'redo' |
        'font' |
        'header' |
        'bold' |
        'italic' |
        'underline' |
        'strikethrough' |
        'text_color' |
        'highlight_color' |
        'numbered_list' |
        'bulleted_list' |
        'align' |
        'decrease_indent' |
        'increase_indent' |
        'direction' |
        'blockquote' |
        'code_block' |
        'link' |
        'image_cloudinary' |
        'image_base64' |
        'image_edit' |
        'embed_youtube_video' |
        'sub_script' |
        'super_script'
    >,


    fetchOutput: any
    fetchImageInfo?: any
    fetchUtils?: any
    fetchEditorStatus?: any

}

