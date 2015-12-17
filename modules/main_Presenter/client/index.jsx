/*
  This is the entry point. Export a react component here.
*/
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as PresenterActions from './components/PresenterActions.jsx'

import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Slides from 'sub_Slides/client/index'
import SidebarView from 'sub_SlideSideBar/client/index'
import Code from 'sub_SharingCode/client/index'
import AudienceList from 'sub_AudienceList/client/index'
import Presentations from 'db/Presentations'

let Presenter = React.createClass({
  mixins: [ReactMeteorData],

  componentWillMount() {
    let user = Meteor.user()._id;

    let link = this.props.data.link;
    let gid = this.props.data.gid;

    Meteor.call('createPresentation', link, user, gid, function (err, result) {
      if (err) {
        console.error('from preview ', err);
      } else {
        console.log('success!', this.props.params.gid);
        // react.props.setPresentation(gid);
        // window.open('/projector/' + gid);
      }
    })
  },

  componentDidMount() {
    window.addEventListener('beforeunload', ()=>{
      Presentations.update(
        {_id: this.data.presentationId},
        {$unset: {code: ''}},
        (err, result) => {
          if (err) console.log(err);
        }
      );
    });
  },

  componentWillUnmount() {
    Presentations.update(
      {_id: this.data.presentationId},
      {$unset: {code: ''}},
      (err, result) => {
        if (err) console.log(err);
      }
    );
  },

  getMeteorData() {
    var presentation = Presentations.findOne({gid: this.props.presentation});
    return {
      presentationId: presentation._id
    }
  },

  nextSlide() {
    Meteor.call('changeIndex', this.props.presentation, this.props.presenter.getIn(['presentation', 'index']) + 1);
  },

  prevSlide() {
    Meteor.call('changeIndex', this.props.presentation, this.props.presenter.getIn(['presentation', 'index']) - 1);
  },

  changeSlide(index, gid) {
    Meteor.call('changeIndex', gid, index);
  },

  render() {
    return (
      <div className="container">
        {this.props.presentation ?
          <div className="presenterSlide">
            Current Slide
            <Slides
              gid={this.props.presentation}
              index={this.props.presenter.getIn(['presentation', 'index'])} />
            Next Slide
            <Slides
              gid={this.props.presentation}
              index={this.props.presenter.getIn(['presentation', 'index']) + 1} />
            <button onClick={this.prevSlide}>prev</button><button onClick={this.nextSlide}>next</button>
            <Code gid={this.props.presentation} />
            <SidebarView gid={this.props.presentation} setIndex={this.changeSlide}/>
          </div> : <Link to="/selectpresentation">Choose a Slide</Link>}
      </div>
    );
  }
})

function mapStateToProps (state) {
  return {
    presenter: state.presenter,
    presentation: state.previews.get('presentation')
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
