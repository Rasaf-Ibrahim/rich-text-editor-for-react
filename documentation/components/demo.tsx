/*__________________________________________

 ✅ import
____________________________________________*/

// hook
import React from 'react'
import DARK_THEME___HOOK from '../hooks/dark-theme-hook'

// next/dynamic
import dynamic from 'next/dynamic'

// rich-text-editor-for-react
const RichTextEditor: any = dynamic(
    () => import('rich-text-editor-for-react'),
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
)

import useRichTextEditor from 'rich-text-editor-for-react/hook'



/*__________________________________________

 ✅ Functional component
____________________________________________*/
export default function RICH_TEXT_EDITOR___COMPONENT() {


    // useRichTextEditor
    const { fetchOutput, fetchImageInfo, fetchUtils, fetchEditorStatus } = useRichTextEditor()



    // theme
    const { dark_theme } = DARK_THEME___HOOK()


    return (

        <>

            <RichTextEditor

                fetchOutput={fetchOutput}

                fetchUtils={fetchUtils}

                fetchEditorStatus={fetchEditorStatus}


                customizeUI={{
                    dark: dark_theme,
                    primaryColor: 'cyan',
                    stickyToolbarOnScroll: false
                }}


                toolbarOptions={['clear_format', 'undo', 'redo', 'font', 'header', 'bold', 'italic', 'underline', 'strikethrough', 'text_color', 'highlight_color', 'numbered_list', 'bulleted_list', 'align', 'decrease_indent', 'increase_indent', 'direction', 'blockquote', 'code_block', 'link', 'embed_youtube_video', 'image_base64', 'image_edit', 'sub_script', 'super_script']}


            />



        </>





    )
}


