import { combineReducers } from 'redux';
import actions from 'actions';


function todos(state = [], action) {
  switch (action.type) {
    case actions.:
      return state.concat([ action.text ])
    default:
      return state
  }
}

export default combineReducers({
	todos,
})
f
