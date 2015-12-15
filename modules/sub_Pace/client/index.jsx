/*
  Pace is an audience module which records and reports how an audience member feels about the pace of the lecture
*/
import React from 'react'
import { connect } from 'react-redux'

import * as paceActions from './components/PaceReduxInteractions'

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

  clickHandler(e) {
    const newPace = e.target.value

    this.updatePace(newPace)

    this.props.votePace(newPace)
  },

  render() {
    const selected = {
      color: 'dodgerblue'
    }
    return (
      <div>
        <button onClick={this.addUser}>Add user</button>
        <button onClick={this.removeUser}>Remove user</button><br />

        <button style={ this.props.pace.get('currentPace') == -1 ? selected : null } onClick={this.clickHandler} value={-1}>Way too fast</button>
        <button style={ this.props.pace.get('currentPace') == -0.5 ? selected : null } onClick={this.clickHandler} value={-0.5}>Little too fast</button>
        <button style={ this.props.pace.get('currentPace') == 0 ? selected : null } onClick={this.clickHandler} value={0}>Just right</button>
        <button style={ this.props.pace.get('currentPace') == 0.5 ? selected : null } onClick={this.clickHandler} value={0.5}>Little too slow</button>
        <button style={ this.props.pace.get('currentPace') == 1 ? selected : null } onClick={this.clickHandler} value={1}>Way too slow</button>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    pace: state.pace,
  }
}

export default connect(mapStateToProps, paceActions)(Pace)
