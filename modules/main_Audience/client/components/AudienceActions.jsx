import Presentations from 'db/Presentations.js'

const SET_INDEX = 'SET_INDEX';
const SET_VIEWER = 'SET_VIEWER';
const SET_END = 'SET_END'

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


Tracker.autorun(()=>{
  let presentationID = store.getState().Home.get('presentationCode')
  if (presentationID){
    let pres = Presentations.findOne({gid: presentationID});
    store.dispatch(setEnd(pres.index))
    if(store.getState().audience.getIn(['viewer', 'index']) === pres.index - 1) {
      store.dispatch(setIndex(pres.index))
    }
  } 
})
