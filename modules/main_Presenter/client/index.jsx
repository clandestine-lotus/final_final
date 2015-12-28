/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import * as PresenterActions from './components/PresenterActions'

import Slides from 'sub_Slides/client/index'
import SidebarView from 'sub_SlideSideBar/client/index'
import Code from 'sub_SharingCode/client/index'
import AudienceList from 'sub_AudienceList/client/index'
import Presentations from 'db/Presentations'

import { CircularProgress } from 'material-ui'


let Presenter = React.createClass({
  // mixins: [ReactMeteorData],

  componentWillMount() {
  },

  componentDidMount() {
    const context = this
    Presentations.find({gid: this.props.presentation}).observe({
      added: doc => {
        // Change readystate of the presentation
        this.props.presentationReady()

        // Register window listener to recycle shortcodes for presentations
        window.addEventListener('beforeunload', () => {
          Presentations.update(
            {_id: doc._id},
            {$unset: {code: ''}},
            (err, result) => {
              if (err) console.log(err)
            }
          )
        })
      },

      changed: (id, doc) => {
        context.props.setIndex(doc.index)
      }
    })

  },

  componentWillUnmount() {
    Presentations.update(
      {_id: this.data.presentationId},
      {$unset: {code: ''}},
      (err, result) => {
        if (err) console.log(err)
      }
    )
  },

  // getMeteorData() {
  //   console.log(this.props)

  //   var presentation = Presentations.findOne({gid: this.props.presentation})
  //   return {
  //     presentationId: presentation._id
  //   }
  // },

  nextSlide() {
    Meteor.call('changeIndex', this.props.presentation, this.props.presenter.getIn(['presentation', 'index']) + 1)
  },

  prevSlide() {
    Meteor.call('changeIndex', this.props.presentation, this.props.presenter.getIn(['presentation', 'index']) - 1)
  },

  changeSlide(index, gid) {
    Meteor.call('changeIndex', gid, index)
  },

  render() {
    const progress = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }

    return (
      <div className="container">
        {
          this.props.presenter.getIn(['presentation', 'isReady']) ?
          <div className="presenterSlide">
            Current Slide
            <Slides
              gid={this.props.presentation}
              index={this.props.presenter.getIn(['presentation', 'index'])}
            />
            Next Slide
            <Slides
              gid={this.props.presentation}
              index={this.props.presenter.getIn(['presentation', 'index']) + 1}
            />
            <button onClick={this.prevSlide}>prev</button><button onClick={this.nextSlide}>next</button>
            <Code gid={this.props.presentation} />
            <SidebarView gid={this.props.presentation} setIndex={this.changeSlide}/>
          </div> :
          <div>
            <div>Loading. Please wait.</div><br />
            <CircularProgress mode="indeterminate" size={1} style={progress} />
          </div>
          /*<Link to="/select">Choose a Slide</Link>*/
        }
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    presenter: state.presenter,
    presentation: state.previews.get('presentation')
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
