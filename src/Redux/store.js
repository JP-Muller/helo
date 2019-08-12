import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './userReducer';
import postReducer from './postReducer'


const rootReducer = combineReducers({
    user: userReducer,
    posts: postReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))


export default { store }