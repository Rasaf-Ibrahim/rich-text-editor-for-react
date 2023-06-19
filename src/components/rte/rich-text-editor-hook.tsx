import React from 'react'
import { useState } from 'react'



export default function useRichTextEditor() {



    const [output, fetchOutput] = useState('')



    const [imageInfo, fetchImageInfo] = useState({

        uploadedImages: [],

        removedImages: []

    })






    const [utils, fetchUtils] = useState({

        resetEditor: (): void => { },

        focusOnEditor: (): void => { },

        removeFocusFromEditor: (): void => { },
    })






    const [editorStatus, fetchEditorStatus] = useState({

        totalWords: 0,
        hasFocus: false
    })








    return {
        output,
        fetchOutput,

        editorStatus,
        fetchEditorStatus,

        utils,
        fetchUtils,

        imageInfo,
        fetchImageInfo,
    }


}
