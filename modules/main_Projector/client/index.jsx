/*
  This is the entry point. Export a react component here.
*/
import React from 'react'
import { connect } from 'react-redux'

import {trackPresenter, trackQuestionMode, setIds} from 'dux/show'
import {getPresentation} from 'dux/deck'

import Slide from 'sub_Slide'
import Grid from 'sub_chat/client/grid'

import Codes from 'db/Codes'

import { Dialog } from 'material-ui'
import { Colors } from 'material-ui/styles'

let Projector = React.createClass({

  componentDidMount() {
    const Code = Codes.findOne(this.props.params.code)
    this.props.setIds(Code)
    this.trackPresenter = trackPresenter(Code.showId)
    this.trackGetDeck = getPresentation(Code.gid)
    this.trackQuestionMode = trackQuestionMode(Code.showId)
  },

  componentWillUnmount() {
    this.trackPresenter.stop()
    this.trackGetDeck.stop()
    this.trackQuestionMode.stop()
  },

  render() {
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
          repositionOnUpdate
          open={this.props.show.question}
        ><Grid isProjector/>
        </Dialog>
        <div>Presentation Code: {this.props.params.code}</div>
        <Slide />
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    show: state.show
  }
}


export default connect(mapStateToProps, {setIds})(Projector)
