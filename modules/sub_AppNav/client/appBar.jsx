import React from 'react'
import { Link } from 'react-router'

import Login from 'sub_Login/client'

import { AppBar } from 'material-ui'

export default React.createClass({
  render() {
    return (
      <AppBar
        id="nav"
        title={<Link to="/" id="logo">final_final</Link>}
        iconElementRight={<Login />}
        showMenuIconButton={false}
      />
    )
  }
})
