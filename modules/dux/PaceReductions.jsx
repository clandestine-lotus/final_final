/*
==============================
    Constant definitions
==============================
 */

const SUBMIT_PACE = 'SUBMIT_PACE'
const SET_SPEED = 'SET_SPEED'
/*
==============================
    Actions
==============================
 */

export const votePace = function(paceDelta) {
  return {
    type: SUBMIT_PACE,
    payload: paceDelta
  }
}

const showSpeed = function (speed) {
  return {
    type: SET_SPEED,
    payload: speed
  }
}

export const trackSpeed = function(showId) {
  return Tracker.autorun(function () {
    let {dispatch} = require('../store.js')
    Meteor.subscribe('show', showId)
    let show = Shows.findOne({_id: showId})
    if (show){
      let rawSpeed = show.rawSpeed || 0
      let speed = rawSpeed / show.viewers
      dispatch('showSpeed', speed)
    } 
  })
}

/*
==============================
    Reducer
==============================
 */
import { Map } from 'immutable'

const initial = Map({currentPace: 0, speed: 0})

export default (state = initial, action) => {
  switch (action.type) {
  case SUBMIT_PACE:
    return state.set('currentPace', action.payload);
  case SET_SPEED:
    return state.set('speed', action.payload)
  default:
    return state;
  }
}
