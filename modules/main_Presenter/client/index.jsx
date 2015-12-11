/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

// import * as PresenterActions from './components/PresenterActions.jsx'

// import Preview from './components/Preview'

import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Slides from '../../sub_Slides/client/index'


let Presenter = React.createClass ({
  render: function () {
    return (
      < div className="container" >
        hello
        < Slides />
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    // TODO: research the right way to get state props
    // TODO: FIX PREVIEWS.PREVIEWS
    previews: state.previews.list
  }
}

export default connect(mapStateToProps)(Presenter)
