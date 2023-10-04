import { Quill } from '../../../dependencies/quill/quill'

// importing the Embed class from Quill, which is a base class for blots that represents block-level embedded content
let Embed = Quill.import('blots/embed')

// creating a new class ImageBlot that extends the Embed class
class ImageBlot extends Embed {

    // declare the static properties within the class
    static blotName = 'cloud_image_custom_blot'
    static tagName = 'img'

    /* defining a static method called 'create'. It takes a value parameter and creates a new node based on the super class's create method. It sets attributes such as src, data-image-id, and width on the node using the provided value. */
    static create(value) {
        let node = super.create(value)
        node.setAttribute('src', value.url)
        node.setAttribute('data-image-id', value.image_id)
        node.setAttribute('width', value.width)
        return node
    }

    /* the following static method 'value' is used to retrieve the values of url, image_id, and width attributes from a given node. */
    static value(node) {
        return {
            url: node.getAttribute('src'),
            image_id: node.getAttribute('data-image-id'),
            width: node.getAttribute('width')
        }
    }
}

/* registering the blot */
Quill.register(ImageBlot)
