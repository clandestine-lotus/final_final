import { combineReducers } from 'redux'

import addPreviews from './components/PresenterReducers.jsx'

// add reducers here
export default combineReducers({
  list: addPreviews,
})
