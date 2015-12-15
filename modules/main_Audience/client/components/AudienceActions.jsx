import Presentations from 'db/Presentations.js'

const SET_INDEX = 'SET_INDEX';

export function setIndex (index) { 
  return {
    type: SET_INDEX,
    payload: index
  }
}


// Tracker.autorun(()=>{
//   let presentationID = store.getState().previews.list.get('presentation')
//   if (presentationID){
//     let pres = Presentations.findOne({gid: presentationID});
//     store.dispatch(setIndex(pres.index))
//   } 
// })
