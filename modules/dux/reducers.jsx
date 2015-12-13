import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

// import reducers to add them to the store
import { counter } from './counter/'

// presenter is unused for now
/* eslint-disable */
import Presenter from 'main_Presenter/client/components/Reducers.jsx'
/* eslint-enable */
import SelectPresentation from 'main_SelectPresentation/client/reducers.jsx'
import Home from 'main_Home/client/components/Reducers.jsx'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  counter: counter,
  previews: SelectPresentation,
  Home: Home,
  presenter: Presenter
})
