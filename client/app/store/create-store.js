import { createStore, applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers/root-reducer.js'
import thunk from 'redux-thunk'

const enhancer = compose(
	applyMiddleware(thunk)
);

export default function (initialState) {
	return createStore(rootReducer, initialState, enhancer);
}