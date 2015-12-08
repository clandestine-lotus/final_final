import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
// import createBrowserHistory from 'history/lib/createBrowserHistory'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import Redux from 'redux'
import { Provider } from 'react-redux'
// devtools import
import { devtools, persistState } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
// import LogMonitor from 'redux-devtools-log-monitor'

// import reducers from './reducers.jsx'
import Home from 'Home/routes'
import Settings from 'Settings/routes'
import Other from 'Other/routes'

console.log(Redux);
let finalCreateStore;
// devtools implementation
if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {
  finalCreateStore = Redux.compose(
    // middleware
    // Redux.applyMiddleware(),
    // devtools
    devTools(),
    // Lets you write ?debug_session=<name> in address bar to persist debug sessions
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(Redux.createStore);
} else {
  finalCreateStore = Redux.createStore
}

const reducer = Redux.combineReducers(Object.assign(
  {},
  {routing: routeReducer}
  ))

// const store = Redux.createStore(reducer)
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
    <DebugPanel top right bottom>
      <devTools store={store} monitor={LogMonitor} />
    </DebugPanel>    
</div>
  , document.getElementById('main')
)

