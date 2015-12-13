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

let Projector = React.createClass({
  getInitialState: function () {
    // this.props.setPresentation(this.props.params.gid);
    console.log('from get initial ', this.props);
    // this.props.setPresentation(this.props.params.gid);
    return {}
  },

  render: function () {
    const gid = this.props.params.gid
    console.log('in render ', this.props)
    return (
      < div >
        < Slides gid={this.props.params.gid} page={this.props.page}/>
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    // TODO: research the right way to get state props
    // TODO: FIX PREVIEWS.PREVIEWS
    setPresentation: state.projector.setPresentation.get('presentation'),
    page: state.projector.setPresentation.get('page')
  }
}

export default connect(mapStateToProps, ProjectorActions)(Projector)
    previews: state.previews.list
  }
}
