import Presentations from 'db/Presentations.js'

const SET_INDEX = 'SET_INDEX';
const SET_VIEWER = 'SET_VIEWER'

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


Tracker.autorun(()=>{
  let presentationID = store.getState().Home.get('presentationCode')
  if (presentationID){
    let pres = Presentations.findOne({gid: presentationID});
    if(store.getState().audience.getIn(['presentation', 'index']) === pres.index - 1) {
      store.dispatch(setIndex(pres.index))
    }
  } 
})
