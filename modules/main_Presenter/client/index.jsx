/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as PresenterActions from './components/PresenterActions.jsx'

import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Slides from '../../sub_Slides/client/index'

let Presenter = React.createClass({
  render: function () {
    return (
      < div className="container" >
        < Slides 
          gid={this.props.presentation}
          presentation={this.props.presenter.get('presentation')} 
          prevSlide={this.props.prevSlide} 
          nextSlide={this.props.nextSlide}/>
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
