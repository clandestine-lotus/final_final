import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

// presenter is unused for now
/* eslint-disable */
import Presenter from 'main_Presenter/client/reducers.jsx'
/* eslint-enable */
import SelectPresentation from 'main_SelectPresentation/client/reducers.jsx'
import counter from 'Other/components/reducers'
import Home from 'main_Home/client/components/Reducers.jsx'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  previews: SelectPresentation
  Home: Home,
})
