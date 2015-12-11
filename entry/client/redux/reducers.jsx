import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import Home from 'main_Home/client/components/Reducers.jsx'
import Presenter from 'main_Presenter/client/components/Reducers.jsx'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  Home: Home,
  previews: Presenter
})
