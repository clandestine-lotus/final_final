/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as PresenterActions from './components/PresenterActions.jsx'

import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Slides from 'sub_Slides/client/index'
import SidebarView from 'sub_SlideSideBar/client/index'
import Code from 'sub_SharingCode/client/index'

let Presenter = React.createClass({
  nextSlide () { 
    Meteor.call('changeIndex', this.props.presentation, this.props.presenter.getIn(['presentation', 'index']) + 1);
  },

  prevSlide () { 
    Meteor.call('changeIndex', this.props.presentation, this.props.presenter.getIn(['presentation', 'index']) - 1);
  },

  render: function () {
    return (
      < div className="container" >
        {this.props.presentation ? 
          <div className="presenterSlide">
            Current Slide
            < Slides 
              gid={this.props.presentation}
              index={this.props.presenter.getIn(['presentation', 'index'])} />
            Next Slide
            < Slides 
              gid={this.props.presentation}
              index={this.props.presenter.getIn(['presentation', 'index']) + 1} />
            <button onClick={this.prevSlide}>prev</button><button onClick={this.nextSlide}>next</button>
            < Code code='j4' />
            <SidebarView gid={this.props.presentation} setIndex={this.props.setIndex}/>
          < /div > : <Link to="/selectpresentation">Choose a Slide</Link>}
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    presenter: state.presenter,
    presentation: state.previews.list.get('presentation')
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
