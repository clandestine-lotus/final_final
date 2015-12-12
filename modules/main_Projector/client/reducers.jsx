import { combineReducers } from 'redux'

import SetPresentation from './components/ProjectorReducers'
import Slides from '../../sub_Slides/client/reducers'

// add reducers here
export default combineReducers({
  setPresentation: SetPresentation,
  slides: Slides
})
