// Setup the singleton store based on environment
import { devTools, persistState } from 'redux-devtools'
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import DevTools from './DevTools.jsx'
import reducers from './reducers.jsx'

let finalCreateStore;
// Implement store with redux devtools in dev environment only
if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  finalCreateStore = compose(
    // Enable middleware:
    applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
    // Enable devtools:
    DevTools.instrument(),

    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = createStore
}

const store = finalCreateStore(reducers)

export default store

