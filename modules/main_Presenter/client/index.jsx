/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { CircularProgress } from 'material-ui'

import * as PresenterActions from 'dux/show'

import {trackPresenter, trackQuestionMode} from 'dux/show'
import {getPresentation} from 'dux/deck'
import {trackAudience} from 'dux/audience'
import { trackSpeed } from 'dux/PaceReductions.jsx'


import Nav from 'sub_AppNav'
import Slide from 'sub_Slide'
import SidebarView from 'sub_SlideSideBar/client'
import AudienceList from 'sub_AudienceList/client'
import Chat from 'sub_chat/client/posts'
import Grid from 'sub_chat/client/grid'
import Speedometer from 'sub_Speedometer/client/index'

// TODO: subscribe for db access instead
import Codes from 'db/Codes'

import { Dialog, IconButton, FontIcon, Styles } from 'material-ui'
import { Colors } from 'material-ui/styles'

let Presenter = React.createClass({

  componentDidMount() {
    const Code = Codes.findOne(this.props.params.code)
    // set ID data in store.show
    this.props.setIds(Code)
    // start tracker for questionMode
    this.trackQuestionMode = trackQuestionMode(Code.showId)
    // start tracker for show pace
    this.trackSpeed = trackSpeed(Code.showId)
    // start tracker for audience
    this.trackAudience = trackAudience(Code.showId)
    // start tracker that hydrates the store once
    this.trackGetDeck = getPresentation(Code.gid)
    // start tracker for presenter
    this.trackPresenter = trackPresenter(Code.showId)
    // start tracker that hydrates store
    PresenterActions.initialPresentation(Code.showId)
  },

  componentWillUnmount() {
    this.trackAudience.stop()
    this.trackPresenter.stop()
    this.trackQuestionMode.stop()
    this.trackGetDeck.stop()
    this.trackSpeed.stop()
  },

  styles: {
    progress: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
    sidebar: {
      display: 'block',
      maxHeight: '30vh',
      overflowY: 'scroll'
    },
    presenterNav: {
      textAlign: 'right',
    }
  },

  startQA(e) {
    if (e) {
      e.stopPropagation()
    }
    // TODO: add "isQA" to db, and subscribe qa mode to it
    // this.props.setQuestions()
    let state = !this.props.show.question
    Meteor.call('questionMode', this.props.show.showId, state)
  },

  openProjector(e) {
    e.stopPropagation()
    window.open('/projector/' + this.props.params.code)
  },

  renderPresenter() {
    const { transitionHandler } = this.props

    let primaryColor = Colors.cyan500

    const dialogTitle = {
      backgroundColor: primaryColor,
      color: 'white',
      padding: '1rem 2rem',
      fontWeight: '300',
    }


    return (
      <div>
        <Dialog
          title={<h3 style={dialogTitle}>Questions</h3>}
          autoDetectWindowHeight
          autoScrollBodyContent
          repositionOnUpdate
          open={this.props.show.question}
          onRequestClose={this.startQA}
        ><Chat />
        </Dialog>
        <div className="row">
          <div className="six columns">
            <div className="row">
              <div className="ten columns" ref="curSlidePanel">
                Current
                <Slide />
              </div>
              <div className="two columns" style={this.styles.presenterNav}>
                <IconButton
                  tooltip="Previous Slide"
                  onClick={() => transitionHandler(-1)}
                  onTapTouch={() => transitionHandler(-1)}
                ><FontIcon
                  hoverColor={Styles.Colors.cyan500}
                  className="material-icons"
                >chevron_left</FontIcon>
                </IconButton>

                <IconButton
                  tooltip="Next Slide"
                  onClick={() => transitionHandler(1)}
                  onTapTouch={() => transitionHandler(1)}
                ><FontIcon
                  hoverColor={Styles.Colors.cyan500}
                  className="material-icons"
                >chevron_right</FontIcon>
                </IconButton>

                <IconButton
                  tooltip="Open Projector"
                  onClick={this.openProjector}
                  onTapTouch={this.openProjector}
                ><FontIcon
                  hoverColor={Styles.Colors.cyan500}
                  className="material-icons"
                >input</FontIcon>
                </IconButton>

                <IconButton
                  tooltip="Q&A"
                  onClick={this.startQA}
                  onTapTouch={this.startQA}
                ><FontIcon
                  hoverColor={Styles.Colors.cyan500}
                  className="material-icons"
                >help</FontIcon>
                </IconButton>
              </div>
            </div>
            <Speedometer speed={this.props.speed} />
            <div className="row">
              Next
              <Slide slideIndex={this.props.show.presenterIndex + 1} />
            </div>
          </div>
          <div className="six columns">
            <div className="row">
              <div id="sidebar_container" className="two columns" style={this.styles.sidebar} >
                <SidebarView deck={this.props.deck} end={this.props.show.numSlides}/>
              </div>
              <div className="ten columns">
                <AudienceList audience={this.props.audience.toArray()} />
              </div>
            </div>
            <div className="row">
              <Chat presentationId={this.props.params.showId} />
            </div>
          </div>
        </div>
      </div>
    )
  },

  renderLoad() {
    return (
      <div>
        <div>Loading. Please wait.</div><br />
        <CircularProgress mode="indeterminate" size={1} style={this.styles.progress} />
      </div>
    )
  },

  render() {
    return (
      <div>
        <Nav />
        <div id="app" className="container">
          {
            this.props.deck.length ? this.renderPresenter() : this.renderLoad()
          }
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    presenter: state.presenter,
    presentation: state.previews,
    deck: state.deck,
    audience: state.audience.get('audience'),
    show: state.show,
    speed: state.pace.get('speed')

  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
