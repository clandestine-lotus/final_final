/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as PresenterActions from './components/PresenterActions.jsx'

import Preview from './components/Preview'

import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


let Presenter = React.createClass ({
  getInitialState: function (props) {
    this.props.dispatch(PresenterActions.getPreviews());
    return {};
  },

  render: function() {
    return (
      <div className="container">
        <header>

          <h1>OMG PREVIEWS PLZ</h1>
            {this.props.previews.map((preview)=> {
              return <Preview key={preview.gid} data={preview} />
            })}
        </header>
      </div>
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
//
// function mapDispatchToProps() {

// }
export default connect(mapStateToProps)(Presenter)
