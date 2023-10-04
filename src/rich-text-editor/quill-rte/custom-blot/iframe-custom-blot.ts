import { Quill } from '../../../dependencies/quill/quill'

// importing the Embed class from Quill, which is a base class for blots that represents block-level embedded content
let Embed = Quill.import('blots/embed')

// Creating a new class IframeBlot that extends the Embed class
class IframeBlot extends Embed {

    // Declare the static properties within the class
    static blotName = 'iframe_custom_blot'
    static tagName = 'iframe'

    /* Defining a static method called 'create'. It takes a value parameter and creates a new node based on the super class's create method. It sets attributes such as src and data-iframe-id on the node using the provided value. */
    static create(value) {
        let node = super.create(value);

        node.setAttribute('src', value.url)
        node.setAttribute('frameborder', '0')
        node.setAttribute('allowfullscreen', 'true')

        // styles
        node.style.height = "15rem"
        node.style.borderRadius = "5px"

        return node
    }

    /* the following static method 'value' is used to retrieve the values of url from a given node. */
    static value(node) {
        return {
            url: node.getAttribute('src')
        }
    }
}

/* Registering the blot */
Quill.register(IframeBlot)
