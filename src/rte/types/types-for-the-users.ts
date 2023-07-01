import React from 'react'

export type PrimaryColorType = 'red' | 'amber' | 'light_green' | 'cyan' | 'indigo'


export type outputType = string


export type imageInfoType = {

    uploadedImages: string[]
    removedImages: string[]
}


export type utilsType = {

    resetEditor: () => void
    focusOnEditor: () => void
    removeFocusFromEditor: () => void
}


export type editorStatusType = {
    
    totalWords: number
    hasFocus: boolean
}


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


    fetchOutput: React.Dispatch<React.SetStateAction<outputType>>
    fetchImageInfo?: React.Dispatch<React.SetStateAction<imageInfoType>>
    fetchUtils?: React.Dispatch<React.SetStateAction<utilsType>>
    fetchEditorStatus?: React.Dispatch<React.SetStateAction<editorStatusType>>

}


