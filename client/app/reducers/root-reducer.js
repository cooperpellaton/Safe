import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {SET_SCREEN_DATA, SET_LOCATION_DATA} from '../actions/actions';

const locationReducer = handleActions({
	[SET_LOCATION_DATA]: (state, action) => {
		return action.payload;
	}
}, [0,0,0]);

const screenReducer = handleActions({
	[SET_SCREEN_DATA]: (state, action) => {
		return action.payload;
	}
}, 0); 

export default combineReducers({
	locationReducer, 
	screenReducer
});
