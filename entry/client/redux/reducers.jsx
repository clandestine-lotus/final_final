import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

import Presenter from 'main_Presenter/client/reducers.jsx'
import SelectPresentation from 'main_SelectPresentation/client/reducers.jsx'
import counter from 'Other/components/reducers'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  previews: SelectPresentation
})
