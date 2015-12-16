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

import * as AudienceActions from './components/AudienceActions'

let AudienceView = React.createClass({
  componentWillMount() {
    // let setViewer = this.props.setViewer;
    // if (this.props.presentation && !!!this.props.viewer.get('id')){
    //   let profile = {
    //     presentation: this.props.presentation,
    //     name: Meteor.user() ? Meteor.user().profile.name : 'Anonymous'
    //   }
    //   Audience.insert(profile, (err, id)=>{
    //     if(err){
    //       console.log('there seems to be an error in this?')
    //       console.error(err);
    //     }
    //     // setViewer(id)
    //     console.log(id, 'no error?');
    //   });
    // }
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
            <Chat presentationId={this.props.presentation} />
          < /div > : <Link to = "/" >Pick an active presentation</Link>}
      </ div >
    );
  }
})

function mapStateToProps (state) {
  return {
    index: state.audience.getIn(['viewer', 'index']),
    end: state.audience.getIn(['presentation', 'index']),
    presentation: state.Home.get('presentationCode'),
    viewer: state.audience.get('viewer')
  }
}

export default connect(mapStateToProps, AudienceActions)(AudienceView)
