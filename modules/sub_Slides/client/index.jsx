/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Presentations from '../globals/collections'
import * as actionCreator from './actions'
import Presentations from '../../main_SelectPresentation/globals/collections'

export default class Slides extends Component {
  constructor() {
    super();
    this.slideMaker = this.slideMaker.bind(this);
    this.changeSlide = this.changeSlide.bind(this);
  }

  componentDidMount () {
    window.addEventListener('onKeyPress', this.changeSlide);
  }

  componentWillUnmount () {
    window.removeEventListener('onKeyPress', this.changeSlide);
  }

  changeSlide (event) { 
    console.log('changing')
    this.props.nextSlide()
    // if(event.keyCode === 39){
    //   this.props.nextSlide()
    // }
    // if(event.keyCode === 37){
    //   this.props.prevSlide();
    // }
  }

  slideMaker () {
    let presentation = Presentations.findOne({gid: this.props.presentation})
    console.log(presentation)
    let svgs = presentation.svgs
    return {__html: svgs[this.props.index]}
  }

  render () {
    return <div className="slide" onClick={this.changeSlide} dangerouslySetInnerHTML={this.slideMaker()}></div>
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
