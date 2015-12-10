/*
  This is the entry point. Export a react component here.
*/

import React, { Component } from 'react';
import Login from 'sub_Login/client/index'

export default class Home extends Component {
  render() {
    return (
      < div >
        <Login />
      </div>
    );
  }
}
