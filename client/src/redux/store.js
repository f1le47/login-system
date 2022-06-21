import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from '../reducers/authReducer'
import thunk from 'redux-thunk'
import postsReducer from '../reducers/postReducer'

const rootReducer = combineReducers({auth: authReducer, post: postsReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))

window.store = store

export default store