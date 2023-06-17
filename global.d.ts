
// we will use the following type when we don't need any type safety
type type_of_anything = any



//  An object with the following type can have any number of properties with string or number keys, and the values can be of any type. 
type type_of_obj_with_any_values = {

    [key: string | number]: any

}



// A function with the following type can have any number of parameters with any type, can return anything with any type or can return nothing 

/* 🔖
Use case for the following type: 

- Suppose, a component accept a function prop
- we just want to set the type of the prop as function
- we don't care about the amount of parameters it receives 
- we don't care about the type of the parameters
- we don't care that the function returns anything or not
- we don't care about the type of the return value
*/

type type_of_func_prop_with_no_rule = (...args: any[]) => any | void


// it represents a react functional component

type type_of_react_functional_component = React.FC


// it represents a single JSX element with a single parent

type type_of_single_element_jsx = React.ReactElement


