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
    addAudience(Codes.showId)
    this.trackAudience = trackAudience(Codes.showId)
    this.trackPresenter = trackPresenter(Codes.showId)
    this.trackGetDeck = getPresentation(Codes.gid)
    window.addEventListener('beforeunload', () => {
      removeViewer()
    })
  },

  componentWillUnmount() {
    removeViewer()
    this.trackAudience.stop()
    this.trackPresenter.stop()
    this.trackGetDeck.stop()
  },

  clickHandler() {

  },

  render() {
    const {increment, decrement, setIndex} = this.props

    const nav = {
      height: '10vh',
      minHeight: '10vh'
    }

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
          style={nav}
        />

        <div className="container">
          <div className="row">
            <div id="sidebar_container" className="two columns" style={sidebar} >
              <SidebarView deck={this.props.deck} end={this.props.maxIndex} />
            </div>
            <div className="seven columns">
              <div className="row">
                <div className="presenterSlide">
                  <Slide />
                  <div className="row">
                    <div className="twelve columns slide_nav" style={{textAlign: "center"}}>
                      <IconButton
                        tooltip="Previous Slide"
                        onClick={decrement}
                        onTapTouch={decrement}
                      ><FontIcon
                        className="material-icons"
                        hoverColor={Styles.Colors.cyan500}
                      ><h6>chevron_left</h6></FontIcon>
                      </IconButton>
                      <Pace />
                      <IconButton
                        tooltip="Next Slide"
                        onClick={increment}
                        onTapTouch={increment}
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
            <div className="three columns">
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
