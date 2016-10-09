import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import {SET_SCREEN_DATA, SET_LOCATION_DATA, SET_SRC_DATA, SET_DESTINATION_DATA, SET_BUS_DATA, SET_CAR_DATA, SET_WATCH_DATA} from '../actions/actions';

const locationReducer = handleActions({
	[SET_LOCATION_DATA]: (state, action) => {
		return action.payload;
	}
}, [0,0]);

const screenReducer = handleActions({
	[SET_SCREEN_DATA]: (state, action) => {
		return action.payload;
	}
}, 0); 

const srcReducer = handleActions({
	[SET_SRC_DATA]: (state, action) => {
		return action.payload;
	}
}, ""); 


const destinationReducer = handleActions({
	[SET_DESTINATION_DATA]: (state, action) => {
		return action.payload;
	}
}, ""); 


const busReducer = handleActions({
	[SET_BUS_DATA]: (state, action) => {
		return action.payload;
	}
}, {}); 

const carReducer = handleActions({
	[SET_CAR_DATA]: (state, action) => {
		return action.payload;
	}
}, {}); 

const watchReducer = handleActions({
	[SET_WATCH_DATA]: (state, action) => {
		return action.payload;
	}
}, {}); 

export default combineReducers({
	locationReducer, 
	screenReducer,
	srcReducer,
	destinationReducer,
	busReducer,
	carReducer,
	watchReducer
});
