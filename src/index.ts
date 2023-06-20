import RichTextEditor from "./rte/rich-text-editor"



/* 🔖
In NextJS, if anyone import the "RichTextEditor" component directly, he will get the "document is not defined" error.

In NextJS, the "RichTextEditor" component will need to be imported dynamically and ssr option will need to be set to false

I don't know why but if I name export a hook along with the  "RichTextEditor" component and I get the same "document is not defined" error for the hook 

So, should everyone import the hook dynamically as well to resolve the error? No, because it's not even possible to import anything dynamically other than a component in NextJS. 

As the error is occurring for anything which is exported along with the "RichTextEditor" component, so we will not export anything along with the "RichTextEditor" component.

As we will not export anything else with the "RichTextEditor" component, instead of name export it, we can default export it.

*/



export default RichTextEditor

