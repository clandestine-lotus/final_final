import { combineReducers } from 'redux'

import projector from './components/ProjectorReducers.jsx'

// add reducers here
export default combineReducers({
  list: projector,
})
