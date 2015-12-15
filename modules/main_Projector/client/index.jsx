/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import * as ProjectorActions from './components/ProjectorActions.jsx'
import Slides from '../../sub_Slides/client/index'
import ChangePage from './components/ChangePage'
import Presentations from 'db/Presentations'

let Projector = React.createClass({
  getInitialState: function () {
    var self = this
    var query = Presentations.find({gid: this.props.params.gid})
    var handle = query.observeChanges({
      changed: function (id, changed) {
        self.props.setIndex(changed.index)
      }
    });
    return {}
  },

  render: function () {
    console.log('in render ', this.props.projector.get('presentation'))
    return (
      < div >
        < Slides gid={this.props.params.gid} index={this.props.projector.getIn(['presentation', 'index'])}/>
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    projector: state.projector,
    presentation: state.previews.list.get('presentation')
  }
}

export default connect(mapStateToProps, ProjectorActions)(Projector)
