
import { useState } from 'react'
import { editorStatusType, imageInfoType, outputType, utilsType } from './types/types-for-the-users'


export default function useRichTextEditor() {


    const [output, fetchOutput] = useState<outputType>('');

    const [imageInfo, fetchImageInfo] = useState<imageInfoType>({
        uploadedImages: [],
        removedImages: []
    })

    const [utils, fetchUtils] = useState<utilsType>({
    resetEditor: (): void => {},
    focusOnEditor: (): void => {},
    removeFocusFromEditor: (): void => {}
    })

    const [editorStatus, fetchEditorStatus] = useState<editorStatusType>({
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
