export const setData = (text) => {
 return {
 type: ‘SET_DATA’,
 id: nextTodoId++,
 text,  //<--ES6. same as text:text, in ES5
 completed: false //<-- initially this is set to false
 }
}
 
//2. Takes filter string and returns proper “Action” JSON object to send to other components.
export const grabData = (filter) => {
 return {
 type: ‘SET_VISIBILITY_FILTER’,
 filter
 }
}
 
//3. Takes Todo item’s id and returns proper “Action” JSON object to send to other components.
export const makeRequest = (id) => {
 return {
 type: ‘TOGGLE_TODO’,
 id
 }
}