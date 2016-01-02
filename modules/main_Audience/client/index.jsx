/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'

import {trackPresenter} from 'dux/show'
import {trackAudience, addAudience, removeViewer} from 'dux/audience'
import {getPresentation} from 'dux/deck'

import Code from 'db/Codes'

import Nav from 'sub_AppNav'
import Slide from 'sub_Slide'
import Chat from 'sub_chat/client/posts'
import AudienceList from 'sub_AudienceList/client'
import SidebarView from 'sub_SlideSideBar/client'
import Pace from 'sub_Pace/client'

import * as Actions from 'dux/show'

import { IconButton, FontIcon, Styles } from 'material-ui'

let AudienceView = React.createClass({

  componentDidMount() {
    const Codes = Code.findOne(this.props.params.code)
    this.props.setIds(Codes)
    addAudience(Codes.showId, Meteor.user())
    this.trackGetDeck = getPresentation(Codes.gid)
    this.trackAudience = trackAudience(Codes.showId)
    this.trackPresenter = trackPresenter(Codes.showId)
    Actions.initialPresentation(Codes.showId)
    window.addEventListener('beforeunload', () => {
      removeViewer(Codes.showId, Meteor.userId())
    })
  },

  componentWillUnmount() {
    removeViewer(this.props.showId, Meteor.userId())
    this.trackAudience.stop()
    this.trackPresenter.stop()
    this.trackGetDeck.stop()
  },

  render() {
    const {increment, decrement} = this.props

    const sidebar = {
      height: '90vh',
      overflowY: 'scroll'
    }

    return (
        <div>
        <Nav />

        <div id="app" className="container">
          <div className="row">
            <div id="sidebar_container" className="two columns" style={sidebar} >
              <SidebarView deck={this.props.deck} end={this.props.maxIndex + 1} />
            </div>
            <div className="six columns">
              <div className="row">
                <div className="presenterSlide">
                  <Slide />
                  <div className="row">
                    <div id="slide_nav" className="twelve columns" style={{textAlign: "center"}}>
                      <IconButton
                        tooltip="Previous Slide"
                        onClick={() => decrement() }
                        onTapTouch={() => decrement() }
                      ><FontIcon
                        hoverColor={Styles.Colors.cyan500}
                        className="material-icons"
                      ><h6>chevron_left</h6></FontIcon>
                      </IconButton>
                      <Pace />
                      <IconButton
                        tooltip="Next Slide"
                        onClick={() => increment()}
                        onTapTouch={() => increment()}
                      ><FontIcon
                        hoverColor={Styles.Colors.cyan500}
                        className="material-icons"
                      ><h6>chevron_right</h6></FontIcon>
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <Chat presentationId={this.props.params.showId} />
              </div>
            </div>
            <div className="four columns">
              <AudienceList audience={this.props.audience.toArray()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    audience: state.audience.get('audience'),
    maxIndex: state.show.maxIndex,
    showId: state.show.showId,
    deck: state.deck
  }
}


export default connect(mapStateToProps, Actions)(AudienceView)
