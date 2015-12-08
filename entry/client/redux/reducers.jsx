import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import Other from 'Other/components/Reducers.jsx'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  counter: Other,
})
