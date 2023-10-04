
import { useState } from 'react'
import { editorStatusType, imageOperationsDataType, enableImageOperationsType, outputType, utilsType } from '../types/types-for-the-users'
import { nanoid } from '../dependencies/nanoid/nanoid';
import { useLogger } from '../dependencies/react-use/react-use';


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


    // 🍪 enableImageOperations state
    const [enableImageOperations, setEnableImageOperations] = useState<enableImageOperationsType>('') //// side effect trigger state


    // 🍪 executeImageOperations function
    const executeImageOperations = (): void => {

        setEnableImageOperations(nanoid(8))
    }


    // 🍪 imageOperationsData state
    const [imageOperationsData, fetchImageOperationsData] = useState<imageOperationsDataType>({
        totalDeleting: 0,
        totalUploading: 0,
        isProcessing: false,
        hasSucceed: false,
        hasFailed: false,
        updatingTheOutputWithImageLink: false,
        outputUpdatedWithImageLink: '', // side effect trigger state
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

        enableImageOperations,
        executeImageOperations,


        imageOperationsData,
        fetchImageOperationsData
    }



}

