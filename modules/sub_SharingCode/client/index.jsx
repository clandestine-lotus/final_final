/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
// import Presentations from 'db/Presentations'

export default class Code extends Component {
  constructor () {
    super();
    this.codeGetter = this.codeGetter.bind(this);
  }

  codeGetter () {
    if (this.props.gid) {
      let presentation = Presentations.findOne({gid: this.props.gid})
      return presentation.code;
    }
  }

  render () {
    return <div>Access code: {this.codeGetter()}</div>
  }
}
