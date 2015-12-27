import {Map, List} from 'immutable'

import Presentations from 'db/Presentations.js'
import Audience from 'db/Audience.js'

//////////////////
// ACTION TYPES //
//////////////////

const SET_AUDIENCE = 'SET_AUDIENCE'

////////////////////////
// INTERNAL FUNCTIONS //
////////////////////////


const setAudience = function (audience) {
  return {
    type: SET_AUDIENCE,
    payload: audience
  }
}

///////////////////////
// TRACKER FUNCTIONS //
///////////////////////

export function trackAudience (show) {
  return Tracker.autorun(function () {
    let audience = Audience.find({presentation: show}).fetch()
    if (audience.length > 0) {
      const {dispatch} = require('../store.js')
      dispatch(setAudience(audience))
    }
  })
}

//////////////////////
// EXPORTED ACTIONS //
//////////////////////

export function addAudience (show) {
  // console.log('hello')
  Meteor.call('addAudience', show, Meteor.user(), function (err, result) {
    if (err) {
      throw new Meteor.Error(err, 'problem adding audience member')
    }
  })
}

export function removeViewer (){
  Meteor.call('removeAudience', Meteor.user()._id, function (err, result){
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
})

export default function reducer(state = initial, action) {
  switch (action.type) {
  case 'SET_AUDIENCE':
    return state.set('audience', List(action.payload));
  default:
    return state;
  }
}


