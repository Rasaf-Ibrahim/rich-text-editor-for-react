import { SvgIconProps } from '@mui/material/SvgIcon';


// 🍪 we will use the following type when we don't need any type safety
export type type_of_anything = any


// 🍪 An object with the following type can have any number of properties with string or number keys, and the values can be of any type. 
export type type_of_obj_with_any_values = {

    [key: string | number]: any

}


// 🍪 A function with the following type can have any number of parameters with any type, can return anything with any type or can return nothing 

/* 🔖
Use case for the following type: 

- Suppose, a component accept a function prop
- we just want to set the type of the prop as function
- we don't care about the amount of parameters it receives 
- we don't care about the type of the parameters
- we don't care that the function returns anything or not
- we don't care about the type of the return value
*/

export type type_of_func_prop_with_no_rule = (...args: any[]) => any | void


// 🍪
export type type_of_react_functional_component = React.FC

// 🍪 
export type type_of_child_component = React.ReactNode


// 🍪 it represents a single JSX element with a single parent
export type type_of_single_element_jsx = React.ReactElement



// 🍪
export type type_of_mui_icon_component = React.FC<SvgIconProps>



// 🍪 type for props of styled component 

export type type_of_styled_component_props<generic_mui_component_props> = {

    children: React.ReactNode
    sx?: type_of_obj_with_any_values

} & generic_mui_component_props & type_of_obj_with_any_values