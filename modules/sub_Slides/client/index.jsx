/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
// import Presentations from '../globals/collections'
import Presentations from 'db/Presentations.js'

export default class Slides extends Component {
  constructor() {
    super();
    this.slideMaker = this.slideMaker.bind(this);
  }

  slideMaker () {
    if(this.props.gid){
      let presentation = Presentations.findOne({gid: this.props.gid})
      let svgs = presentation.svgs
      return {__html: svgs[this.props.page]}
    }
  }

  render () {
    return <div onClick={this.changeSlide} dangerouslySetInnerHTML={this.slideMaker()}></div>
  }
}
