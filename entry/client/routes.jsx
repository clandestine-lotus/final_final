import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
// devtools import
import { devTools, persistState } from 'redux-devtools'
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import LogMonitor from 'redux-devtools-log-monitor'

// import reducers from './reducers.jsx'
import Home from 'Home/routes'
import Settings from 'Settings/routes'
import Other from 'Other/routes'

let finalCreateStore;
// devtools implementation
if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  finalCreateStore = compose(
    // middleware
    // applyMiddleware(),
    // devtools
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
} else {
  finalCreateStore = createStore
}

const reducer = combineReducers(Object.assign(
  {},
  {routing: routeReducer}
  ))

// const store = createStore(reducer)
const store = finalCreateStore(reducer)
const history = createHistory()
syncReduxAndRouter(history, store)

const App = React.createClass({
  render() {
    return <div>{this.props.children}</div>
  }
})

const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: Home,
    childRoutes: [
      Settings,
      Other
    ]
  }]
}

console.log(store);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history} routes={rootRoute} />
    </Provider>
    <LogMonitor store={store.devToolsStore} />
  </div>
  , document.getElementById('main')
)

// <DebugPanel top right bottom>
//       <DevTools store={store} monitor={LogMonitor} />
//     </DebugPanel>
