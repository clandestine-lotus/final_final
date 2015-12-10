import { combineReducers } from 'redux'

import addPreviews from './components/reducers.jsx'

// add reducers here
export default combineReducers({
  addPreviews: addPreviews,
})
