/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'

import {trackPresenter, setIds} from 'dux/show'
import {getPresentation} from 'dux/deck'
// import { bindActionCreators, createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import * as ProjectorActions from './components/ProjectorActions.jsx'
import Slide from 'sub_Slide'
import Codes from 'db/Codes'
// import Presentations from 'db/Presentations'

let Projector = React.createClass({

  componentDidMount () { 
    const Code = Codes.findOne(this.props.params.code)
    this.props.setIds(Code)
    this.trackPresenter = trackPresenter(Code.showId)
    this.trackGetDeck = getPresentation(Code.gid)
  },

  componentWillUnmount () { 
    this.trackPresenter.stop()
    this.trackGetDeck.stop()
  },

  render: function () {
    return <Slide />
  }
})

function mapStateToProps (state) {
  return {}
}


export default connect(mapStateToProps, {setIds})(Projector)
