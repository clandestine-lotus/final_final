/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { CircularProgress } from 'material-ui'

import * as PresenterActions from 'dux/show'

import {trackPresenter} from 'dux/show'
import {getPresentation} from 'dux/deck'
import {trackAudience} from 'dux/audience'

import Slide from 'sub_Slide'
import SidebarView from 'sub_SlideSideBar/client/index'
import AudienceList from 'sub_AudienceList/client/index'
import Chat from 'sub_chat/client/posts'

import Codes from 'db/Codes'

let Presenter = React.createClass({

  componentDidMount() {
    const Code = Codes.findOne(this.props.params.code)
    // set ID data in store.show
    this.props.setIds(Code)
    // start tracker for presenter
    this.trackPresenter = trackPresenter(Code.showId)
    // start tracker that hydrates the store once
    this.trackGetDeck = getPresentation(Code.gid)
    this.trackAudience = trackAudience(Code.showId)
  },

  componentWillUnmount() {
    this.trackAudience.stop()
    this.trackPresenter.stop()
    this.trackGetDeck.stop()
  },

  render() {
    const progress = {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }

    const {transitionHandler, setIndex} = this.props

    return (
      <div className="container">
        {
          this.props.deck.length ?
          <div className="presenterSlide">
            Current Slide
            <Slide/>
            <button onClick={()=> transitionHandler(-1)}>prev</button><button onClick={()=> transitionHandler(1)}>next</button>
            <AudienceList audience={this.props.audience.toArray()} />
            <Chat presentationId={this.props.params.showId} />
          </div> :
          <div>
            <div>Loading. Please wait.</div><br />
            <CircularProgress mode="indeterminate" size={1} style={progress} />
          </div>
        }
      </div>
    )
  }
})

            // <SidebarView deck={this.props.deck} end={this.props.max}/>
function mapStateToProps (state) {
  return {
    presenter: state.presenter,
    presentation: state.previews,
    deck: state.deck,
    audience: state.audience.get('audience'),
    max: state.show.numSlides
  }
}

export default connect(mapStateToProps, PresenterActions)(Presenter)
