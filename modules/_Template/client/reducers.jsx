import { combineReducers } from 'redux'

import feature from './reducers/feature.jsx'
import feature2 from './reducers/feature2.jsx'

// add reducers here
export default combineReducers({
  feature: feature,
  feature2: feature2,
})
