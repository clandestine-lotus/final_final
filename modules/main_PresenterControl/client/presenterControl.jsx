/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'

// import actions
import * as actionCreators from 'dux/show'
// import trackers
import {trackPresenter} from 'dux/show'
import {getPresentation} from 'dux/deck'

// import sub components
import Slide from 'sub_Slide'
import Chat from 'sub_chat'

// import db
import CodeDB from 'db/Codes'

//showId is in this.props.params.showId

let PresenterControl = React.createClass({

  componentDidMount() {
  },

  componentWillReceiveProps() {
    const Codes = CodeDB.findOne(this.props.params.code)
    // console.log(Codes);
    // set ID data in store.show
    this.props.setIds(Codes)
    // start tracker for presenter
    this.trackPresenter = trackPresenter(Codes.showId)
    // start tracker that hydrates the store once
    this.trackGetDeck = getPresentation(Codes.gid)
  },

  componentWillUnmount () {  },

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
