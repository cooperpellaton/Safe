import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import actions from '../actions/actions';

const locationReducer = handleActions({
  SET_LOCATION_DATA: (state, action) => ({
    state: action.payload
  	}),
	}, { 
		 geo: 0,
		 src: 0,
		 destination: 0, 
	});

const screenReducer = handleActions({
  SET_SCREEN_NUMBER: (state, action) => ({
    state: action.payload
  	}),
	}, 
	{ 
		 screenNumber: 0
	}); 

export default combineReducers({
	locationReducer, 
	screenReducer
})
