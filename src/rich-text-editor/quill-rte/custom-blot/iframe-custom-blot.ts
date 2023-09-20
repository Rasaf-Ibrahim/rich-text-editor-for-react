// rich-text-editor-for-react-dependencies 
import dependencies from 'rich-text-editor-for-react-dependencies'

const {
    quill
} = dependencies

const { Quill } = quill


// Importing the Embed class from Quill, which is a base class for blots that represents block-level embedded content
let Embed = Quill.import('blots/embed');

// Creating a new class IframeBlot that extends the Embed class
class IframeBlot extends Embed {

    /* Defining a static method called 'create'. It takes a value parameter and creates a new node based on the super class's create method. It sets attributes such as src and data-iframe-id on the node using the provided value. */
    static create(value) {
        let node = super.create(value);

        node.setAttribute('src', value.url);
        node.setAttribute('frameborder', '0');
        node.setAttribute('allowfullscreen', 'true');
    
        // styles
        node.style.height = "15rem";
        node.style.borderRadius = "5px";
 

        return node
    }

    /* The following static method 'value' is used to retrieve the values of url from a given node. */
    static value(node) {
        return {
            url: node.getAttribute('src')
        };
    }
}

/* Setting the name of the blot */
IframeBlot.blotName = 'iframe_custom_blot';

/* Setting the tag name to 'iframe', this means that the custom blot will be represented by an 'iframe' tag in the editor's HTML. */
IframeBlot.tagName = 'iframe';

/* Registering the blot */
Quill.register(IframeBlot);
