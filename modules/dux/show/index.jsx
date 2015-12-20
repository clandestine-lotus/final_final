import Shows from 'db/shows'

//////////////////
// ACTION TYPES //
//////////////////

const SET_PRESENTER_INDEX = 'SET_PRESENTER_INDEX'
const SET_MAX = 'SET_MAX'
const NUM_SLIDES = 'NUM_SLIDES'
const SET_CURRENT_SLIDE = 'SET_CURRENT_SLIDE'
const SET_IDS = 'SET_IDS'


////////////////////////
// INTERNAL FUNCTIONS //
////////////////////////


// setSlide internal function for the tracker to change
const setPresenter = function (index) {
  return {
    type: SET_PRESENTER_INDEX,
    payload: index
  }
}

// setMax calls this helper dispatch function
const newMax = function (index) {
  return {
    type: SET_MAX,
    payload: index,
  }
}

// internal function for setIndex to change the current slide
const setSlide = function(index) {
  return {
    type: SET_CURRENT_SLIDE,
    payload: index
  }
}

// setMax internal function for the tracker to change
const setMax = function (index) {
  return function (dispatch, getState) {
    const { show } = getState()

    if (show.currentIndex === show.maxIndex){
      // change currnent slide if it's at the max one...
      dispatch(setSlide(index))      
    }
    dispatch(newMax(index))
  }
}

///////////////////////
// TRACKER FUNCTIONS //
///////////////////////
// stop trackers with <<trackername>>.stop()


// track the maxIndex and presenterIndex from the server
export function trackPresenter (id) {
  return Tracker.autorun(function (computation) {
    let show = Shows.findOne({_id: id})
    if (show){
      const {dispatch} = require('../store.js')
      dispatch(setPresenter(show.presenterIndex))
      dispatch(setMax(show.maxIndex))
      // set the current slide to presenterIndex if owner is logged in
      // if persenter has to reload, position will not be lost
      if (show.ownerId === Meteor.userId()){
        dispatch(setSlide(show.presenterIndex))
      }
    }
  })
}

//////////////////////
// EXPORTED ACTIONS //
//////////////////////

// actions to increment slide
export function increment() {
  return setIndex(null, 1)
}

// actions to decrement slide
export function decrement() {
  return setIndex(null, -1)
}

// action to manually set index using the first arg
export function setIndex(index, operator) {
  return function(dispatch, getState){
    const { show } = getState()

    // get the desired index if !index
    if (index === null){
      index = show.currentIndex + operator
    }

    // check if out of bounds
    if (index < 0 || index >= show.numSlides){
      console.log('out of bounds: ', index, ' from ', show.numSlides, ' slides')
      return '';
    }

    // update persenterIndex if owner && not out of bounds
    // owner is unaffected by maxIndex
    if (Meteor.userId() === show.ownerId){
      // sends the index to update the presenterIndex and maxIndex
      Meteor.call('ownerShowUpdate', index, show.showId, function (err, result) {
        if(err){
          console.log('update failed')
        } else {
          // used to dispatch store action here, use tracker instead (not optimisic)   
        }
      })

    // if not an owner... check if index ahead of owner
    } else if (index > show.maxIndex){
      console.log('cannot be ahead of presenter: ', index, ' from ', show.maxIndex, ' slides')
      return ;
      
    // if ok, change store index without touching db
    } else {
      // increment currentIndex using set
      dispatch(setSlide(index))
      
    }
  }
}

// set the number of slides in a presentation
export function numSlides (num) {
  return {
    type: NUM_SLIDES,
    payload: num,
  }
}

// takes in a code document returned from mongo
export function setIds (obj) {
  return {
    type: SET_IDS,
    payload: {
      gid: obj.gid,
      showId: obj.showId,
      ownerId: obj.ownerId,
    }
  }
}


const initialState = {
  currentIndex: 0,
  maxIndex: 0,
  numSlides: 1,
  presenterIndex: 0,
  ownerId: null,
  showId: null,
  gid: null,
}

//////////////
// REDUCERS //
//////////////

export default function (state = initialState, action) {
  switch (action.type) {
  case NUM_SLIDES:
    return Object.assign({}, state, {numSlides: action.payload})
  case SET_MAX:
    return Object.assign({}, state, {maxIndex: action.payload})  
  case SET_CURRENT_SLIDE:
    return Object.assign({}, state, {currentIndex: action.payload})
  case SET_PRESENTER_INDEX:
    return Object.assign({}, state, {presenterIndex: action.payload})
  case SET_IDS:
    return Object.assign({}, state, action.payload)
  default:
    return state;
  }
}