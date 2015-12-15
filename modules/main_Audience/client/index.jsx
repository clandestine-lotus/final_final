/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Slides from 'sub_Slides/client/index'
import SidebarView from 'sub_SlideSideBar/client/index'
import Code from 'sub_SharingCode/client/index'

import * as AudienceActions from './components/AudienceActions'

let Audience = React.createClass({

  prevSlide() {
    this.props.setIndex(this.props.index - 1)
  },

  nextSlide() {
    this.props.setIndex(this.props.index + 1)
  },

  render: function () {
    return (
      < div className="container" >
        {this.props.presentation ? 
          <div className="presenterSlide">
            Current Slide
            < Slides 
              gid={this.props.presentation}
              index={this.props.index} />
            Next Slide
            <button onClick={this.prevSlide}>prev</button><button onClick={this.nextSlide}>next</button>
            < Code gid={this.props.presentation} />
          < /div > : <Link to="/">Pick an active presentation</Link>}
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    index: state.audience.getIn(['presentation', 'index']),
    presentation: state.Home.get('presentationCode')
  }
}

export default connect(mapStateToProps, AudienceActions)(Audience)
