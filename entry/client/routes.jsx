import React from 'react'
// import ReactDOM from 'react-dom'
/*eslint-disable*/
import { Router, Route, Link, IndexRoute } from 'react-router' // ESLINT: unused vars (all)
/*eslint-enable*/

/**
 *  Import module root routes here and add them to rootRoute below
 */
import Home from 'main_Home/routes'
import Settings from 'Settings/routes'
import Other from 'Other/routes'
import Select from 'main_Select/routes'
import Presenter from 'main_Presenter/client/routes'
import Projector from 'main_Projector/client/routes'
import Audience from 'main_Audience/client/routes'
// Delete chat when you're finished
import chat from 'sub_chat/client/routes'

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
      Select,
      Presenter,
      Projector,
      Audience,
      // Delete chat when you're finished
      chat
    ]
  }]
}

export default rootRoute

