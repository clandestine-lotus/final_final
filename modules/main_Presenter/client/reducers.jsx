import { combineReducers } from 'redux'

import addPreviews from './components/Reducers.jsx'
// add reducers here
export default combineReducers({
  list: addPreviews
})
