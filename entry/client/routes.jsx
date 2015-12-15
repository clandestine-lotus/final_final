import React from 'react'
// import ReactDOM from 'react-dom'
/*eslint-disable*/
import { Router, Route, Link, IndexRoute } from 'react-router' // ESLINT: unused vars (all)
/*eslint-enable*/

/**
 *  Import module root routes here and add them to rootRoute below
 */
import Home from 'main_Home/client/routes'
import Settings from 'Settings/routes'
import Other from 'Other/routes'
import SelectPresentation from 'main_SelectPresentation/client/routes'
import Presenter from 'main_Presenter/client/routes'
import Projector from 'main_Projector/client/routes'
import Audience2 from 'main_Audience2/client/routes'

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
      SelectPresentation,
      Presenter,
      Projector,
      Audience2
    ]
  }]
}

export default rootRoute

