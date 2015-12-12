/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { Link } from 'react-router'
// import Presentations from '../globals/collections'
import Presentations from '../../main_SelectPresentation/globals/collections'

export default class Slides extends Component {
  constructor() {
    super();
    this.slideMaker = this.slideMaker.bind(this);
  }

  slideMaker () {
    if(this.props.gid){
      let presentation = Presentations.findOne({gid: this.props.gid})
      let svgs = presentation.svgs
      return {__html: svgs[this.props.presentation.get('index')]}
    }
  }

  render () {
    return (
    <div>
    {this.props.gid ? <div className="slide" dangerouslySetInnerHTML={this.slideMaker()}></div> :
      <Link to = "/selectpresentation" >Pick a Presentation</Link> }
    <div><button onClick={this.props.prevSlide}>prev</button><button onClick={this.props.nextSlide}>next</button></div></div>
    )
  }
}


