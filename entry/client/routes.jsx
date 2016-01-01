import React from 'react'

/**
 *  Import module routes and add them to rootRoute
 */
import Home from 'main_Home/routes'
import Select from 'main_Select/routes'
import Presenter from 'main_Presenter/client/routes'
import Projector from 'main_Projector/client/routes'
import Audience from 'main_Audience/client/routes'

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
      Select,
      Presenter,
      Projector,
      Audience,
    ]
  }]
}

export default rootRoute

