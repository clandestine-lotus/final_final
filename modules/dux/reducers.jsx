import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

// import reducers to add them to the store
import { counter } from './counter/'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  counter: counter,
})
