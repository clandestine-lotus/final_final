import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'

// import reducers to add them to the store
import Home from 'dux/HomeReductions'
import Audience from 'dux/audience'
import Chat from 'dux/chat'
import Pace from 'dux/PaceReductions'
import Transitions from 'dux/transitions'

// Slide data storage
import Deck from 'dux/deck'
// Slide index and metadata storage
import Show from 'dux/show'
// picker that gets data from google api
import SelectPresentation from 'dux/deckPicker'

// add reducers here
export default combineReducers({
  chat: Chat,
  show: Show,
  deck: Deck,
  routing: routeReducer,
  previews: SelectPresentation,
  home: Home,
  audience: Audience,
  transitions: Transitions,
  pace: Pace,
})
