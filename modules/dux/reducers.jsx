import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

// import reducers to add them to the store
import { counter } from './counter/'

// presenter is unused for now
/* eslint-disable */
import Presenter from 'main_Presenter/client/components/Reducers.jsx'
/* eslint-enable */
import SelectPresentation from 'main_SelectPresentation/client/components/PresenterReducers'
import Home from 'main_Home/client/components/Reducers'
import Projector from 'main_Projector/client/components/ProjectorReducers'
import Audience from 'dux/audience'
import Chat from 'dux/chat'
import Pace from 'sub_Pace/client/components/PaceReductions'

// add reducers here
export default combineReducers({
  routing: routeReducer,
  counter: counter,
  previews: SelectPresentation,
  Home: Home,
  presenter: Presenter,
  projector: Projector,
  audience: Audience,
  chat: Chat,
  pace: Pace,
})
