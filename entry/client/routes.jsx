import React from 'react'
// import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'

/**
 *  Import module root routes here and add them to rootRoute below
 */
import Home from 'main_Home/client/routes'
import Settings from 'Settings/routes'
import Other from 'Other/routes'
import Presenter from 'main_Presenter/client/routes'

// define root component
const App = React.createClass({
  render() {
    return <div>{this.props.children}</div>
  }
})

// define root routes
const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: App,
    indexRoute: Home,
    childRoutes: [
      Settings,
      Other,
      Presenter
    ]
  }]
}

export default rootRoute

