/*
  Pace is an audience module which records and reports how an audience member feels about the pace of the lecture
*/
import React from 'react'
import { connect } from 'react-redux'

import * as paceActions from './components/PaceReductions'

import { IconButton, FontIcon, Styles } from 'material-ui'


// TODO: fix this to find the right presentation id when the time comes.
const TODO_PRESENTATION_ID = 1

const Pace = React.createClass({

  // addUser() {
  componentDidMount() {
    this.updateUserCount(1)
  },

  // removeUser() {
  componentWillUnmount() {
    this.updateUserCount(-1)
    this.updatePace(0)
  },

  updateUserCount(delta) {
    Meteor.call('updateUserCount', TODO_PRESENTATION_ID, delta, function(err, numChanged, status) {
      if (err) {
        console.error('Error updating pace:', err)
      } else {
        console.log('updateUserCount', err, numChanged, status)
      }
    })
  },

  updatePace(newPace) {
    const oldPace = this.props.pace.get('currentPace')
    let delta = newPace - oldPace

    Meteor.call('updatePace', TODO_PRESENTATION_ID, delta, function(err, numChanged, status) {
      if (err) {
        console.error('Error updating pace:', err)
      } else {
        console.log('updatePace', err, numChanged, status)
      }
    })
  },

  clickHandler(value) {
    const newPace = value

    this.updatePace(newPace)

    this.props.votePace(newPace)
  },

  render() {
    const selected = {
      color: 'dodgerblue'
    }
    return (
      <span>
        <IconButton
          tooltip="Way too fast"
          disabled={this.props.pace.get('currentPace') == -1}
          onClick={this.clickHandler.bind(null, -1)}
          onTapTouch={this.clickHandler.bind(null, -1)}
        ><FontIcon
          className="material-icons"
          hoverColor={Styles.Colors.cyan500}
        >hotel</FontIcon>
        </IconButton>

        <IconButton
          tooltip="Too fast"
          disabled={this.props.pace.get('currentPace') == -0.5}
          onClick={this.clickHandler.bind(null, -0.5)}
          onTapTouch={this.clickHandler.bind(null, -0.5)}
        ><FontIcon
          className="material-icons"
          hoverColor={Styles.Colors.cyan500}
        >directions_walk</FontIcon>
        </IconButton>

        <IconButton
          tooltip="Just Right"
          disabled={this.props.pace.get('currentPace') == 0}
          onClick={this.clickHandler.bind(null, -0)}
          onTapTouch={this.clickHandler.bind(null, -0)}
        ><FontIcon
          className="material-icons"
          hoverColor={Styles.Colors.cyan500}
        >directions_run</FontIcon>
        </IconButton>

        <IconButton
          tooltip="Too slow"
          disabled={this.props.pace.get('currentPace') == 0.5}
          onClick={this.clickHandler.bind(null, 0.5)}
          onTapTouch={this.clickHandler.bind(null, 0.5)}
        ><FontIcon
          className="material-icons"
          hoverColor={Styles.Colors.cyan500}
        >directions_bike</FontIcon>
        </IconButton>

        <IconButton
          tooltip="Way too slow"
          disabled={this.props.pace.get('currentPace') == 1}
          onClick={this.clickHandler.bind(null, 1)}
          onTapTouch={this.clickHandler.bind(null, 1)}
        ><FontIcon
          className="material-icons"
          hoverColor={Styles.Colors.cyan500}
        >flight</FontIcon>
        </IconButton>
      </span>
    )
  }
})

function mapStateToProps(state) {
  return {
    pace: state.pace,
  }
}

export default connect(mapStateToProps, paceActions)(Pace)
