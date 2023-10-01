// import
import { type_of_anything } from "../../../../types/commonly-used-types"
import { type_of_rte_state } from "../../../../types/types-for-the-library"



// type
export type type_of_align = 'left' | 'right' | 'center'

export type type_of_align_children_payload = {

    selected_align: type_of_align,

    quillRef: type_of_anything,

    rte_state: type_of_rte_state
}




// align_children function
export function align_children(payload: type_of_align_children_payload) {

    const { selected_align, quillRef, rte_state } = payload


    const [leaf] = quillRef.current.getLeaf(rte_state.editor_cursor.position)

    const element = leaf && leaf.domNode

    const parentElement = element?.parentElement



    function remove_ql_custom_align_class() {

        // Remove existing classes starting with "ql-image"

        let classes = parentElement?.className.split(" ")

        for (let i = 0; i < classes?.length; i++) {

            if (classes[i].startsWith("ql-custom-align")) {
                parentElement?.classList.remove(classes[i])
            }
        }

    }



    // 🥔 align to 'center'
    if (selected_align === 'center') {

        remove_ql_custom_align_class()

        parentElement?.classList.add('ql-custom-align-center')

    }


    // 🥔 align to 'right'
    else if (selected_align === 'right') {

        remove_ql_custom_align_class()

        parentElement?.classList.add('ql-custom-align-right')

    }


    // 🥔 align to 'left'
    else if (selected_align === 'left') {

        remove_ql_custom_align_class()

        parentElement?.classList.add('ql-custom-align-left')

    }


    // 🥔 align to 'justify'
    else if (selected_align === 'justify') {

        remove_ql_custom_align_class()

        parentElement?.classList.add('ql-custom-align-justify')

    }

}