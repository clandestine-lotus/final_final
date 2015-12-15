/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

// import * as PresenterActions from './components/PresenterActions.jsx'

// import Preview from './components/Preview'
import { bindActionCreators, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import * as ProjectorActions from './components/ProjectorActions.jsx'
import Slides from '../../sub_Slides/client/index'
import ChangePage from './components/ChangePage'

let Projector = React.createClass({
  getInitialState: function () {
    // this.props.setPresentation(this.props.params.gid);
    console.log('from get initial ', this.props);
    // this.props.setPresentation(this.props.params.gid);
    return {}
  },

  render: function () {
    console.log('in render ', this.props.projector.get('presentation'))
    ChangePage(this.props.params.gid)
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
