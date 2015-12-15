import Presentations from '../../../main_SelectPresentation/globals/collections'

const SET_PRESENTATION = 'SET_PRESENTATION';
const SET_INDEX = 'SET_INDEX';

export function setPresentation(id) {
  return {
    type: SET_PRESENTATION,
    payload: id
  }
}

export function setIndex(index) {
  return {
    type: SET_INDEX,
    payload: index
  }
}

// Tracker.autorun(()=>{
//   let presentationID = store.getState().projector.list.get('presentation')
//   if (presentationID){
//     let pres = Presentations.findOne({gid: presentationID});
//     store.dispatch(setIndex(pres.index))
//   } 
// })

// import Presentations from 'db/Presentations.js'

// const ADD_PREVIEWS = 'ADD_PREVIEWS';
// const SET_INDEX = 'SET_INDEX';

// export function addPreviews (previews) {
//   return {
//     type: ADD_PREVIEWS,
//     payload: previews
//   }
// }

// export function setIndex (index) { 
//   return {
//     type: SET_INDEX,
//     payload: index
//   }
// }


