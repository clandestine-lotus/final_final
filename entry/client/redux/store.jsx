import { devTools, persistState } from 'redux-devtools'
import { compose, createStore, applyMiddleware } from 'redux'

import DevTools from './DevTools.jsx'
import reducers from './reducers.jsx'

let finalCreateStore;
// devtools implementation
if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  finalCreateStore = compose(
    // middleware
    // applyMiddleware(),
    // devtools
    DevTools.instrument(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
} else {
  finalCreateStore = createStore
}

// function configureStore(initialState) 
  // const store = finalCreateStore();

// const store = configureStore()


// const store = createStore(reducer)

const store = finalCreateStore(reducers)

export default store
