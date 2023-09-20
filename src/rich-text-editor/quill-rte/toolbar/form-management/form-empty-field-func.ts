

// 🍪 form_empty_field_func 🍪
export function form_empty_field_func(checking_this) {

    let empty_field = false


    function empty_string__false_boolean__empty_array() {

        let empty = false

        if (
            // empty string
            checking_this === '' ||
            checking_this === null ||

            // false boolean value
            checking_this === false ||

            // empty quill rich text editor
            checking_this === '<p><br></p>' ||

            // empty array
            (Array.isArray(checking_this) && checking_this.length === 0)
        ) {

            empty = true
        }

        return empty
    }



    function empty_object() {

        let empty = false

        if (typeof checking_this === 'object' &&
            !Array.isArray(checking_this)) {

            for (
                const [property_name, property_value] of Object.entries(checking_this)
            ) {

                if (
                    // empty string
                    checking_this[property_name] === '' ||
                    checking_this[property_name] === null ||

                    // false boolean value
                    checking_this[property_name] === false ||

                    // empty array
                    (Array.isArray(checking_this[property_name]) && checking_this[property_name].length === 0)
                ) {

                    empty = true
                }

            }


        }

        return empty

    }



    if (empty_string__false_boolean__empty_array() || empty_object()) {

        empty_field = true
    }

    return empty_field


}



