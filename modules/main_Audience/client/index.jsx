/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {trackPresenter} from 'dux/show'
import {trackAudience, addAudience, removeViewer} from 'dux/audience'
import {getPresentation} from 'dux/deck'

// import SidebarView from 'sub_SlideSideBar/client'
import Code from 'db/Codes'

import Login from 'sub_Login/client'
import Slide from 'sub_Slide'
import Chat from 'sub_chat/client/posts'
import AudienceList from 'sub_AudienceList/client'
import SidebarView from 'sub_SlideSideBar/client'
import Pace from 'sub_Pace/client'

import * as Actions from 'dux/show'

import { AppBar, RaisedButton, IconButton, FontIcon, Styles } from 'material-ui'

let AudienceView = React.createClass({

  componentDidMount() {
    const Codes = Code.findOne(this.props.params.code)
    this.props.setIds(Codes)
    if (Meteor.userId()) {
      addAudience(Codes.showId)
    }
    this.trackGetDeck = getPresentation(Codes.gid)
    this.trackAudience = trackAudience(Codes.showId)
    this.trackPresenter = trackPresenter(Codes.showId)
    this.props.audienceStart(Codes.showId)
    window.addEventListener('beforeunload', () => {
      if (Meteor.userId()) {
        removeViewer()
      }
    })
  },

  componentWillUnmount() {
    if (Meteor.userId()) {
      removeViewer()
    }
    this.trackAudience.stop()
    this.trackPresenter.stop()
    this.trackGetDeck.stop()
  },

  render() {
    const {setIndex, transitionHandler} = this.props

    const sidebar = {
      height: '90vh',
      overflowY: 'scroll'
    }

    return (
        <div>
        <AppBar
          id="nav"
          title={<Link to="/" id="logo">final_final</Link>}
          iconElementRight={<Login />}
          showMenuIconButton={false}
        />

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
                        onClick={() => transitionHandler(-1) }
                        onTapTouch={() => transitionHandler(-1) }
                      ><FontIcon
                        className="material-icons"
                        hoverColor={Styles.Colors.cyan500}
                      ><h6>chevron_left</h6></FontIcon>
                      </IconButton>
                      <Pace />
                      <IconButton
                        tooltip="Next Slide"
                        onClick={() => transitionHandler(1)}
                        onTapTouch={() => transitionHandler(1)}
                      ><FontIcon
                        className="material-icons"
                        hoverColor={Styles.Colors.cyan500}
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
    deck: state.deck
  }
}

export default connect(mapStateToProps, Actions)(AudienceView)
