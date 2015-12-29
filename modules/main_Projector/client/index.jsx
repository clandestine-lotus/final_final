/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
// import { connect } from 'react-redux'

// import { bindActionCreators, createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import * as ProjectorActions from './components/ProjectorActions.jsx'
import Slide from 'sub_Slide'
// import Code from 'sub_SharingCode/client/index'
// import Presentations from 'db/Presentations'

let Projector = React.createClass({
  // getInitialState: function () {
  //   var self = this
  //   var query = Presentations.find({gid: this.props.params.gid})
  //   var handle = query.observeChanges({
  //     changed: function (id, changed) {
  //       self.props.setIndex(changed.index)
  //     }
  //   });
  //   return {}
  // },

  render: function () {
    return <Slide />
  }
})

// function mapStateToProps (state) {
//   return {
//     projector: state.projector,
//     presentation: state.previews.list.get('presentation')
//   }
// }

export default Projector
