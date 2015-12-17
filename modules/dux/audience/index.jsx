import {Map, List} from 'immutable'
import Presentations from 'db/Presentations.js'
import Audience from 'db/Audience.js'

const SET_INDEX = 'SET_INDEX';
const SET_VIEWER = 'SET_VIEWER';
const SET_END = 'SET_END';
const SET_AUDIENCE = 'SET_AUDIENCE';

export function setIndex (index) { 
  return {
    type: SET_INDEX,
    payload: index
  }
}

export function setViewer (id) {
  return { 
    type: SET_VIEWER,
    payload: id
  }
}

export function setEnd (index) {
  return {
    type: SET_END,
    payload: index
  }
} 

export function setAudience (audience) {
  return {
    type: SET_AUDIENCE,
    payload: audience
  }
}


const initial = Map({
  presentation: Map({
    index: 0, 
    audience: List()
  }),
  viewer: Map({
    id: null,
    index: 0
  })
})


export default function reducer(state = initial, action) {
  switch (action.type) {
  case 'SET_INDEX':
    return state.setIn(['viewer', 'index'], action.payload);
  case 'SET_VIEWER':
    return state.setIn(['viewer', 'id'], action.payload);
  case 'SET_END': 
    return state.setIn(['presentation', 'index'], action.payload);
  case 'SET_AUDIENCE':
    return state.setIn(['presentation', 'audience'], List(action.payload));
  default:
    return state;
  }
}


