What is the need of this hook?

If we hadn't had this hook. The user would need to create output state

const [output, fetchOutput] = useState('')

and need to pass the fetchOutput as a prop.

Similarly, the user would need to create `utils`, `editorState`, etc state and function. 

It's helping the user to write less code.
