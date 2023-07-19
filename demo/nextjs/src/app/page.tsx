
// import
import dynamic from 'next/dynamic'

const RichTextEditorComponent = dynamic(
    () => import('./_rich-text-editor'),
    {
        ssr: true,
        loading: () => <p> Loading... </p> ,
    }
)


// metadata
export const metadata = {
    title: 'Rich Text Editor for React',
}


// functional component
export default function RichTextEditorPage() {

    return (

            <RichTextEditorComponent />

    )
}