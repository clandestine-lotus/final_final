/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Slides from 'sub_Slides/client/index'
import SidebarView from 'sub_SlideSideBar/client/index'
import Code from 'sub_SharingCode/client/index'
import Chat from 'sub_chat/client/posts'
import Audience from 'db/Audience'
import Presentations from 'db/Presentations'
import AudienceList from 'sub_AudienceList/client/index'

import * as AudienceActions from 'dux/audience/index'

let AudienceView = React.createClass({
  componentDidMount() {
    let setViewer = this.props.setViewer;
    if (this.props.presentation){
      let profile = {
        presentation: this.props.presentation,
        name: Meteor.user() ? Meteor.user().profile.name : 'Anonymous',
        thumbnail: Meteor.user() ? Meteor.user().services.google.picture : null
      }
      Audience.insert(profile, (err, id)=>{
        if(err){
          console.error(err);
        }
        setViewer(id);
      });
    }
    window.addEventListener('beforeunload', ()=>{
      Audience.remove({_id: this.props.viewer.get('id')}, (err, result)=>{
        if(err) {
          console.error(err);
        }
      })
    })
    Tracker.autorun(()=>{
      if (this.props.presentation){
        let pres = Presentations.findOne({gid: this.props.presentation});
        let audience = Audience.find({presentation: this.props.presentation}).fetch();
        this.props.setAudience(audience);
        this.props.setEnd(pres.index);
        if(this.props.index === pres.index - 1) {
          this.props.setIndex(pres.index)
        }
      } 
    })
  },

  componentWillUnmount () { 
    Audience.remove({_id: this.props.viewer.get('id')}, (err, result)=> {
      if(err) {
        console.error(err)
      }
    })
  },

  prevSlide() {
    if(this.props.index > 0) {
      this.props.setIndex(this.props.index - 1)
    }
  },

  nextSlide() {
    if(this.props.index < this.props.end){
      this.props.setIndex(this.props.index + 1)
    }
  },

  render: function () {
    return (
      < div className="container" >
        {this.props.presentation ? 
          <div className="presenterSlide">
            < Slides 
              gid={this.props.presentation}
              index={this.props.index} />
            <button onClick={this.prevSlide}>prev</button><button onClick={this.nextSlide}>next</button>
            < Code gid={this.props.presentation} />
            <SidebarView gid={this.props.presentation} setIndex={this.props.setIndex} end={this.props.end}/>
            <AudienceList audience={this.props.audience.toArray()} />
            <Chat presentationId={this.props.presentation} />
          < /div > : <Link to = "/" >Pick an active presentation</Link>}
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

export default connect(mapStateToProps, AudienceActions)(AudienceView)
