
import { useState } from 'react'
import { editorStatusType, imageOperationsDataType, imageOperationsEnabledType, outputType, utilsType } from '../types/types-for-the-users'


export default function useRichTextEditor() {


    // 🍪 output state
    const [output, fetchOutput] = useState<outputType>('');


    // 🍪 utils state
    const [utils, fetchUtils] = useState<utilsType>({
        resetEditor: (): void => { },
        focusOnEditor: (): void => { },
        removeFocusFromEditor: (): void => { }
    })


    // 🍪 editorStatus state
    const [editorStatus, fetchEditorStatus] = useState<editorStatusType>({
        totalWords: 0,
        totalCharacters: 0,
        totalCharactersExcludingSpacing: 0,
        hasFocus: false
    })


    // 🍪 isImageOperationsEnabled state
    const [isImageOperationsEnabled, setIsImageOperationsEnabled] = useState<imageOperationsEnabledType>(false)



    // 🍪 enableImageOperations function
    const enableImageOperations = (): void => {
        setIsImageOperationsEnabled(!isImageOperationsEnabled)
    }


    // 🍪 imageOperationsData state
    const [imageOperationsData, fetchImageOperationsData] = useState<imageOperationsDataType>({
        totalDeleting: 0,
        totalUploading: 0,
        isProcessing: false,
        hasSucceed: false,
        hasFailed: false,
        updatingTheOutputWithImageLink: false,
        outputUpdatedWithImageLink: '',
        idsOfTheImages: []
    })








    // 🍪 return
    return {
        output,
        fetchOutput,

        editorStatus,
        fetchEditorStatus,

        utils,
        fetchUtils,

        isImageOperationsEnabled,
        enableImageOperations,


        imageOperationsData,
        fetchImageOperationsData
    }



}

