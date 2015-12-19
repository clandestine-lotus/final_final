/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'

import * as actionCreators from 'dux/show'
import {trackPresenter} from 'dux/show'
import {getPresentation} from 'dux/deck'
// import { Link } from 'react-router'

import Slide from 'sub_Slide'
import Chat from 'sub_chat'

import CodeDB from 'db/Codes'

// import rootReducer from './reducers';
// import Slides from 'sub_Slides/client/index'
// import SidebarView from 'sub_SlideSideBar/client/index'
// import Code from 'sub_SharingCode/client/index'
// import AudienceList from 'sub_AudienceList/client/index'
// import Presentations from 'db/Presentations'

//showId in this.props.params.showId

let PresenterControl = React.createClass({

  componentDidMount() {
  },

  componentWillReceiveProps() {
    const Codes = CodeDB.findOne(this.props.params.code)
    // console.log(Codes);
    this.props.setIds(Codes)
    this.trackPresenter = trackPresenter(Codes.showId)
    this.trackGetDeck = getPresentation(Codes.gid)
    

  },

  componentWillUnmount () { 
    
  },

  render: function () {
    const {increment, decrement, setIndex} = this.props

    return (
      <div className="container">
      <div>
        <button onClick={() => increment()}>++</button>
        <button onClick={() => decrement()}>--</button>
      </div>
        <Slide />
        <Chat presentationId={this.props.params.showId} />
      </div>
      )
  }


})

function selectState (state) {
  return {}
}


export default connect(selectState, actionCreators)(PresenterControl)
/**
 *     actionCreators adds this to props:
 *     decrement, increment, numSlides, setIndex
 */
