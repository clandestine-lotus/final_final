import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

// import reducers to add them to the store

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

// Slide data storage
import Deck from 'dux/deck'
// Slide index and metadata storage
import Show from 'dux/show'
// picker that gets data from google api
import deckPicker from 'dux/deckPicker'

// add reducers here
export default combineReducers({
  deckPicker: deckPicker,
  chat: Chat,
  show: Show,
  deck: Deck,
  routing: routeReducer,
  // previews: SelectPresentation,
  Home: Home,
  presenter: Presenter,
  projector: Projector,
  audience: Audience,
  pace: Pace,
})
