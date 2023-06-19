import RichTextEditor from "./components/rte/rich-text-editor"
import useRichTextEditor from "./components/rte/rich-text-editor-hook"



// hook can't be imported dynamically and set ssr:false in nextJS! so not exporting the hook. maybe I will remove the hook later
export { RichTextEditor}