/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
// import Presentations from '../globals/collections'
import * as actionCreator from './actions'
import Presentations from '../../main_SelectPresentation/globals/collections'

export default class Slides extends Component {
  constructor() {
    super();
    this.slideMaker = this.slideMaker.bind(this);
  }


  slideMaker () {
    if(this.props.presentation){
      let presentation = Presentations.findOne({gid: this.props.presentation})
      console.log(presentation)
      let svgs = presentation.svgs
      return {__html: svgs[this.props.index]}
    }
  }

  render () {
    return (
    <div>
    {this.props.presentation ? <div className="slide" dangerouslySetInnerHTML={this.slideMaker()}></div> :
      <Link to = "/selectpresentation" >Pick a Presentation</Link> }
    <div><button onClick={this.props.prevSlide}>prev</button><button onClick={this.props.nextSlide}>next</button></div></div>
    )
  }
}

// onkeypress={this.changeSlide(event)}
function mapStateToProps(state) {
  return {
    presentation: state.previews.list.get('presentation'),
    index: state.previews.slides.get('index')
  }
}

export default connect(mapStateToProps, actionCreator)(Slides)
