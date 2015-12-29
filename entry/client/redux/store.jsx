// Setup the singleton store based on environment
/*eslint-disable*/
import { devTools, persistState } from 'redux-devtools' // ESLINT: unused var (devTools)
/*eslint-enable*/
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import DevTools from './DevTools.jsx'
import reducers from 'dux/reducers.jsx'


let store
let finalCreateStore

Meteor.startup(() => {
  // Implement store with redux devtools in dev environment only
  if (false) {
  // if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
    finalCreateStore = compose(
      // Enable middleware:
      applyMiddleware(thunk),
      // Enable devtools:
      DevTools.instrument(),

      // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(thunk)(createStore)
  }

  store = finalCreateStore(reducers)

})

export default store

