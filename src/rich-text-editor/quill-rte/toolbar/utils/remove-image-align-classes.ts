
// types
import { type_of_rte_state } from "../../../../types/types-for-the-library"


// types
export type type_of_remove_image_align_classes_payload = {

    rte_state: type_of_rte_state
    quillRef: type_of_anything

}


// util function
export const remove_image_align_classes = (payload: type_of_remove_image_align_classes_payload) => {

    const { quillRef, rte_state } = payload


    const [leaf] = quillRef.current.getLeaf(rte_state.editor_cursor.position)

    const element = leaf && leaf.domNode

    const parentElement = element?.parentElement



    function remove_ql_custom_align_class() {


        let Classes = element?.className?.split(" ")

        for (let i = 0; i < Classes?.length; i++) {

            if (Classes[i].startsWith("ql-custom-align")) {
                element?.classList.remove(Classes[i])
            }
        }


        // parent element's classes
        let ParentClasses = parentElement?.className?.split(" ")

        for (let i = 0; i < ParentClasses?.length; i++) {

            if (ParentClasses[i].startsWith("ql-custom-align")) {
                parentElement?.classList.remove(ParentClasses[i])
            }
        }


    }

    remove_ql_custom_align_class()

}