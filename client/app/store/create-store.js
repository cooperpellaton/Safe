import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/root-reducer.js'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

// const enhancer = compose(
// 	applyMiddleware(thunk, logger)
// );

export function createInitialStore(initialState) {
	return createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
}