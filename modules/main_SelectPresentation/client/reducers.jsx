import { combineReducers } from 'redux'

import addPreviews from './components/PresenterReducers.jsx'
import Slides from '../../sub_Slides/client/reducers'

// add reducers here
export default combineReducers({
  list: addPreviews,
  slides: Slides
})
