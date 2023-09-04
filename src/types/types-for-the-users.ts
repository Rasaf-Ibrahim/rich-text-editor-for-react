// 🫓 parts of RichTextEditorPropsType


// 🥔 fontType
type fontType = {
    fontSize?: string
    fontFamily?: string
    fontWeight?: number
    lineHeight?: number | string
    letterSpacing?: string
}


// 🥔 typographyType
export type typographyType = {
    h1?: fontType
    h2?: fontType
    h3?: fontType
    h4?: fontType
    h5?: fontType
    h6?: fontType
    p?: fontType
}


// 🥔 defaultVisibleToolbarOptionsType
export type defaultVisibleToolbarOptionsType = {
    phone?: number
    tablet?: number
    laptop?: number
}


// 🥔 customizeUiType
export type customizeUiType = {

    backgroundColor: string
    primaryColor: string
    iconColor?: string
    stickyToolbarOnScroll?: boolean
    defaultVisibleToolbarOptions?: defaultVisibleToolbarOptionsType
    highlightJS?: any
    typography?: typographyType
}


// 🥔 ToolbarNonConditionalOptionsType
export type ToolbarNonConditionalOptionsType =
    | 'clear_format'
    | 'undo'
    | 'redo'
    | 'font'
    | 'header'
    | 'bold'
    | 'italic'
    | 'underline'
    | 'strikethrough'
    | 'text_color'
    | 'highlight_color'
    | 'numbered_list'
    | 'bulleted_list'
    | 'align'
    | 'decrease_indent'
    | 'increase_indent'
    | 'direction'
    | 'blockquote'
    | 'code_block'
    | 'link'
    | 'format_media'
    | 'embed_video'
    | 'sub_script'
    | 'super_script'
    | 'word_count';



// 🥔 ToolbarImageCloudOptionType
export type ToolbarImageCloudOptionType = 'image_cloud'


// 🥔 ToolbarImageBase64OptionType
export type ToolbarImageBase64OptionType = 'image_base64';


// 🥔 outputType
export type outputType = string


// 🥔 utilsType
export type utilsType = {

    resetEditor: () => void
    focusOnEditor: () => void
    removeFocusFromEditor: () => void
}

// 🥔 editorStatusType
export type editorStatusType = {

    totalWords: number,
    totalCharacters: number,
    totalCharactersExcludingSpacing: number,
    hasFocus: boolean
}


// 🥔 imageOperationsEnabledType
export type imageOperationsEnabledType = boolean



// 🥔 acceptableImageType
export type imageValidationType = {
    acceptableFileFormats?: string[]
    maximumFileSize?: number
}


// 🥔 imageOperationsDataType
export type imageOperationsDataType = {
    isProcessing: boolean,
    hasSucceed: boolean,
    hasFailed: boolean,
    totalUploading: number,
    totalDeleting: number,
    outputUpdatedWithImageLink: string //unique
}




// 🫓 RichTextEditorPropsType

type RichTextEditorNonConditionalPropsType = {

    customizeUI: customizeUiType

    initialValue?: string

    fetchOutput: React.Dispatch<React.SetStateAction<outputType>>
    fetchUtils?: React.Dispatch<React.SetStateAction<utilsType>>
    fetchEditorStatus?: React.Dispatch<React.SetStateAction<editorStatusType>>
}


type RichTextEditorConditionalPropsType = {

    toolbarOptions: Array<ToolbarNonConditionalOptionsType | ToolbarImageBase64OptionType>

    imageValidation?: imageValidationType

    cloudImageApiEndpoint?: never

    isImageOperationsEnabled?: never

    fetchImageOperationsData?: never

} | {

    toolbarOptions: Array<ToolbarNonConditionalOptionsType | ToolbarImageCloudOptionType>

    imageValidation?: imageValidationType

    cloudImageApiEndpoint: string

    isImageOperationsEnabled?: imageOperationsEnabledType

    fetchImageOperationsData?: React.Dispatch<React.SetStateAction<imageOperationsDataType>>
}


export type RichTextEditorPropsType = RichTextEditorNonConditionalPropsType & RichTextEditorConditionalPropsType



// 🫓 DisplayTheOutputType
export type DisplayTheOutputType = {
    backgroundColor: string,
    primaryColor: string,
    html: string,
    highlightJS?: any
    typography?: typographyType
} 