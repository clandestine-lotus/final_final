import Presentations from 'db/Presentations.js'

const ADD_PREVIEWS = 'ADD_PREVIEWS';
const SET_INDEX = 'SET_INDEX';
const SET_CODE = 'SET_CODE';
const SET_VIEWER = 'SET_VIEWER';
const SET_ID = 'SET_ID';

export function addPreviews (previews) {
  return {
    type: ADD_PREVIEWS,
    payload: previews
  }
}

export function setViewer (id) {
  return { 
    type: SET_VIEWER,
    payload: id
  }
}

export function setIndex (index) { 
  return {
    type: SET_INDEX,
    payload: index
  }
}

export function setCode (code) {
  return {
    type: SET_CODE,
    payload: code
  }
}

Tracker.autorun(()=>{
  let presentationID = store.getState().previews.list.get('presentation')
  if (presentationID){
    let pres = Presentations.findOne({gid: presentationID});
    store.dispatch(setIndex(pres.index))
  } 
})
