import Presentations from 'main_SelectPresentation/globals/collections'

const ADD_PREVIEWS = 'ADD_PREVIEWS';
const SET_INDEX = 'SET_INDEX';

export function addPreviews (previews) {
  return {
    type: ADD_PREVIEWS,
    payload: previews
  }
}

export function setIndex (index) { 
  return {
    type: SET_INDEX,
    payload: index
  }
}


Tracker.autorun(()=>{
  let presentationID = store.getState().previews.list.get('presentation')
  let pres = Presentations.findOne({gid: presentationID});
  store.dispatch(setIndex(pres.index))
})
