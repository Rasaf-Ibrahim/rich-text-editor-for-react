'use client'

// import
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(
      () => import('rich-text-editor-for-react'),
      {
          ssr: false,
          loading: () => <p>Loading...</p>,
      }
)

import useRichTextEditor  from 'rich-text-editor-for-react/hook'


// functional component 
export default function RichTextEditorComponent() {
 
 
  const {output, fetchOutput} = useRichTextEditor()
 
 
    return (
 
        <RichTextEditor
 
            fetchOutput={fetchOutput}
 
            toolbarOptions={['clear_format', 'undo', 'redo', 'font', 'header', 'bold', 'italic', 'underline', 'strikethrough', 'text_color', 'highlight_color', 'numbered_list', 'bulleted_list', 'align', 'decrease_indent', 'increase_indent', 'direction', 'blockquote', 'code_block', 'link',  'embed_youtube_video', 'image_base64', 'image_edit', 'sub_script', 'super_script']}
 
            customizeUI={{
                dark: true,
                primaryColor:'red'
            }}
 
        />
 
    )
}
