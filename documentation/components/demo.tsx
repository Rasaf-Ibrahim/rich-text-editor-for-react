import React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import dynamic from 'next/dynamic'


const RichTextEditor:any = dynamic(
    () => import('rich-text-editor-for-react'),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
)




export default function RICH_TEXT_EDITOR___COMPONENT() {



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







  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }


  const pickTheme = ()=> {

    if(theme ==='system') {
        return true
    }

    else if(theme ==='light') {
        return false
    }

    else if(theme === 'dark') {
        return true
    }
  }


    return (

        <>

            <RichTextEditor

                

                fetchOutput={fetchOutput}

                fetchUtils={fetchUtils}

                fetchEditorStatus={fetchEditorStatus}


                dark={pickTheme()}

                primaryColor='red'


                toolbarOptions={['clear_format', 'undo', 'redo', 'font', 'header', 'bold', 'italic', 'underline', 'strikethrough', 'text_color', 'highlight_color', 'numbered_list', 'bulleted_list', 'align', 'decrease_indent', 'increase_indent', 'direction', 'blockquote', 'code_block', 'link',  'embed_youtube_video', 'sub_script', 'super_script', 'binary_image']}

    

            />


        
        </>





    )
}
 

