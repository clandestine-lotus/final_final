/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import store from 'dux/store'
import {trackPresenter} from 'dux/show'
import {trackAudience, addAudience, removeViewer} from 'dux/audience'
import {getPresentation} from 'dux/deck'

// import SidebarView from 'sub_SlideSideBar/client/index'
import Code from 'db/Codes'

import Slide from 'sub_Slide'
import Chat from 'sub_chat/client/posts'
import AudienceList from 'sub_AudienceList/client/index'
import SidebarView from 'sub_SlideSideBar/client/index'

import * as Actions from 'dux/show'

let AudienceView = React.createClass({

  componentDidMount () { 
    const Codes = Code.findOne(this.props.params.code)
    this.props.setIds(Codes)
    addAudience(Codes.showId)
    this.trackAudience = trackAudience(Codes.showId)
    this.trackPresenter = trackPresenter(Codes.showId)
    this.trackGetDeck = getPresentation(Codes.gid)
    window.addEventListener('beforeunload', ()=>{
      removeViewer()
    })
  },

  componentWillUnmount () { 
    removeViewer()
    this.trackAudience.stop()
    this.trackPresenter.stop()
    this.trackGetDeck.stop()
  },

  render () {
    const {increment, decrement, setIndex} = this.props
    return (
      < div className="container" >
          <div className="presenterSlide">
            < Slide />
            <button onClick={decrement}>prev</button><button onClick={increment}>next</button>
            <Chat presentationId={this.props.params.showId} />
          < /div >
          <AudienceList audience={this.props.audience.toArray()} />
          <SidebarView deck={this.props.deck} end={this.props.maxIndex}/>
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    audience: state.audience.get('audience'),
    maxIndex: state.show.maxIndex, 
    deck: state.deck
  }
}

export default connect(mapStateToProps, Actions)(AudienceView)
            // <Code gid={this.props.presentation} />
