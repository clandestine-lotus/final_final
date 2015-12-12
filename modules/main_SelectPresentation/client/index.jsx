/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

import Preview from './components/Preview'
import * as PresenterActions from './components/PresenterActions.jsx'

import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let Presenter = React.createClass({
  getInitialState: function (props) {
    this.props.getPreviews();
    console.log(this);
    return {};
  },

  render: function () {
    let setPres = this.props.setPresentation
    return (
      <div className="container">
        <header>

          <h1>OMG PREVIEWS YOYO</h1>
          < Link to = {'/present'} >Go to presentation< / Link >
        </header>
        {this.props.previews.map((preview)=> {
          return <Preview setPresentation={setPres} key={preview.gid} data={preview} />
        })}
      </div>
    );
  }
})

function mapStateToProps (state) {
  return {
    // TODO: research the right way to get state props
    // TODO: FIX PREVIEWS.PREVIEWS
    previews: state.previews.list.get('previews')
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
