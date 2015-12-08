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

// devtools implementation
console.log(process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR);
if (process.env.NODE_ENV !== 'production' && !process.env.IS_MIRROR) {


}else{

}
const reducer = Redux.combineReducers(Object.assign(
  {},
  {routing: routeReducer}
  ))

const store = Redux.createStore(reducer)
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
  <Provider store={store}>
    <Router history={history} routes={rootRoute} />
  </Provider>

  , document.getElementById('main')
)

