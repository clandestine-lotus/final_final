import {Map, List} from 'immutable'

import Audience from 'db/Audience.js'
import Shows from 'db/Shows'

//////////////////
// ACTION TYPES //
//////////////////

const SET_AUDIENCE = 'SET_AUDIENCE'
const SET_VIEWERS = 'SET_VIEWERS'

////////////////////////
// INTERNAL FUNCTIONS //
////////////////////////


const setAudience = function (audience) {
  return {
    type: SET_AUDIENCE,
    payload: audience
  }
}

const setViewers = function (viewers) {
  return { 
    type: SET_VIEWERS,
    payload: viewers
  }
}

///////////////////////
// TRACKER FUNCTIONS //
///////////////////////

export function trackAudience (show) {
  return Tracker.autorun(function () {
    const {dispatch} = require('../store.js')
    Meteor.subscribe('audience', show)
    Meteor.subscribe('show', show)
    let audience = Audience.find({presentation: show}).fetch()
    if (audience.length > 0) {
      dispatch(setAudience(audience))
    }
    let showing = Shows.findOne({_id: show})
    if (showing && showing.viewers > -1) {
      dispatch(setViewers(showing.viewers))
    }
  })
}

//////////////////////
// EXPORTED ACTIONS //
//////////////////////

export function addAudience (show, user) {
  // console.log('hello')
  Meteor.call('addAudience', show, user, function (err, result) {
    if (err) {
      throw new Meteor.Error(err, 'problem adding audience member')
    }
  }) 
}

export function removeViewer (show, user){
  Meteor.call('removeAudience', show, user, function (err, result){
    if (err) {
      throw new Meteor.Error(err, 'problem removing audience member')
    }
  })
}
//////////////
// REDUCERS //
//////////////

const initial = Map({
  audience: List(),
  viewers: 0
})

export default function reducer(state = initial, action) {
  switch (action.type) {
  case 'SET_AUDIENCE':
    return state.set('audience', List(action.payload));
  case 'SET_VIEWERS':
    return state.set('viewers', action.payload)
  default:
    return state;
  }
}


