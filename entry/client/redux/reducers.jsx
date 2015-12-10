import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import Presenter from 'main_Presenter/client/components/Reducers.jsx'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  previews: Presenter
})
