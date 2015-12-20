/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {bindActionCreators } from 'redux'

import store from 'dux/store'
import {trackPresenter} from 'dux/show'
import {getPresentation} from 'dux/deck'

// import SidebarView from 'sub_SlideSideBar/client/index'
import Code from 'db/Codes'
import Audience from 'db/Audience'


import Slide from 'sub_Slide'
import Chat from 'sub_chat/client/posts'
import AudienceList from 'sub_AudienceList/client/index'

import * as Actions from 'dux/show'
import * as AudAct from 'dux/audience'

let AudienceView = React.createClass({
  componentDidMount() {
    let setViewer = this.props.setViewer
    const Codes = Code.findOne(this.props.params.code)
    console.log(Codes, 'we get?')
    let profile = {
      presentation: Codes.showId,
      name: Meteor.user() ? Meteor.user().profile.name : 'Anonymous',
      thumbnail: Meteor.user() ? Meteor.user().services.google.picture : null
    }

    Audience.insert(profile, (err, id)=>{
      if(err){
        console.error(err);
      }
      setViewer(id);
    });

    this.track = Tracker.autorun(()=>{
      const {dispatch} = require('dux/store.js')
      let audience = Audience.find({presentation: Codes.showId}).fetch();
      console.log('are we tracking?', audience, Codes)
      this.props.setAudience(audience);
    })

    window.addEventListener('beforeunload', ()=>{
      Audience.remove({_id: this.props.viewer.get('id')}, (err, result)=>{
        if(err) {
          console.error(err);
        }
      })
    })
    
  },

  componentWillReceiveProps (){
    const store = store

    const Codes = Code.findOne(this.props.params.code)
    this.props.setIds(Codes)
    this.trackPresenter = trackPresenter(Codes.showId)
    this.trackGetDeck = getPresentation(Codes.gid)

  },

  componentWillUnmount () { 
    Audience.remove({_id: this.props.viewer.get('id')}, (err, result)=> {
      if(err) {
        console.error(err)
      }
    })
    this.track.stop();
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
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    audience: state.audience.getIn(['presentation', 'audience']),
    index: state.audience.getIn(['viewer', 'index']),
    end: state.audience.getIn(['presentation', 'index']),
    presentation: state.Home.get('presentationCode'),
    viewer: state.audience.get('viewer')
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, Actions, AudAct), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AudienceView)
            // <SidebarView gid={this.props.presentation} setIndex={this.props.setIndex} end={this.props.end}/>
            // <Code gid={this.props.presentation} />
