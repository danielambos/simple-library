import reducers from './ducks'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

export default createStore(reducers, applyMiddleware(thunk))