/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'

export default class Code extends Component {
  render () {
    return <div>{this.props.code}</div>
  }
}
