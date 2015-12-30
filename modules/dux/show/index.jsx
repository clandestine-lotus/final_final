import Shows from 'db/shows'

//////////////////
// ACTION TYPES //
//////////////////

const SET_PRESENTER_INDEX = 'SET_PRESENTER_INDEX'
const SET_MAX = 'SET_MAX'
const NUM_SLIDES = 'NUM_SLIDES'
const SET_CURRENT_SLIDE = 'SET_CURRENT_SLIDE'
const SET_IDS = 'SET_IDS'
const SET_CODE = 'SET_CODE'
const SET_TRANSITION_INDEX = 'SET_TRANSITION_INDEX'
const SET_MAX_TRANSITION = 'SET_MAX_TRANSITION'
const SET_PRESENTER_TRANSITION = 'SET_PRESENTER_TRANSITION'


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

const setPresenterTransition = function (index) {
  return {
    type: SET_PRESENTER_TRANSITION,
    payload: index
  }
}

const setMaxTransition = function (index) {
  return { 
    type: SET_MAX_TRANSITION,
    payload: index
  }
}

const setTransitionIndex = function (index) {
  return { 
    type: SET_TRANSITION_INDEX,
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

const setCode = function (code) {
  return {
    type: SET_CODE,
    payload: code
  }
}


// setMax internal function for the tracker to change
const setMax = function (index, transition) {
  return function (dispatch, getState) {
    const { show } = getState()

    if (show.currentIndex === show.presenterIndex){
      // change currnent slide if it's at the max one...
      if(show.currentTransition === show.presenterTransition){
        dispatch(setTransitionIndex(transition))
      }
      if(show.maxTransition < transition){
        dispatch(setMaxTransition(transition))
      }
      dispatch(setSlide(index))      
    }
    if(show.maxIndex < index){
      dispatch(newMax(index))
    }
  }
}

///////////////////////
// TRACKER FUNCTIONS //
///////////////////////
// stop trackers with <<trackername>>.stop()


// track the maxIndex and presenterIndex from the server
export function trackPresenter (id) {
  return Tracker.autorun(function (computation) {
    Meteor.subscribe('show', id)
    let show = Shows.findOne({_id: id})
    if (show){
      const {dispatch} = require('../store.js')
      dispatch(setMax(show.presenterIndex, show.presenterTransition))
      dispatch(setPresenter(show.presenterIndex))
      dispatch(setPresenterTransition(show.presenterTransition))
      // set the current slide to presenterIndex if owner is logged in
      // if persenter has to reload, position will not be lost
      if (show.ownerId === Meteor.userId()){
        dispatch(setSlide(show.presenterIndex))
        dispatch(setTransitionIndex(show.presenterTransition))
      }
    }
  })
}

//////////////////////
// EXPORTED ACTIONS //
//////////////////////

// actions to increment slide
export function setShow (code) {
  return function (dispatch) {
    dispatch(setCode(code))
  }
}

export function transitionHandler (operator) {
  return function(dispatch, getState) {
    const { show, transitions } = getState()
    let index = show.currentTransition + operator
    let slide = show.currentIndex
    if (index < 0) {
      index = transitions[slide - 1].length - 1 > 0 ? transitions[slide - 1].length - 1 : 0
      dispatch(decrement(index))
    } else if (index > transitions[slide].length) {
      dispatch(increment())
    } else {
      dispatch(setIndex(slide, 0, index))
    }
  }
} // this code is lame/awesome who wrote this?

export function increment() {
  return setIndex(null, 1, 0)
}

// actions to decrement slide
export function decrement(transitionIndex) {
  return setIndex(null, -1, transitionIndex)
}

// action to manually set index using the first arg
export function setIndex(index, operator, transition) {
  return function(dispatch, getState){
    const { show } = getState()

    // get the desired index if !index
    if (index === null){
      index = show.currentIndex + operator
    }

    if (transition === null){
      transition = 0
    }

    // check if out of bounds
    if (index < 0 || index >= show.numSlides){
      console.log(transition, index, 'what are we getting ')
      console.log('out of bounds: ', index, ' from ', show.numSlides, ' slides')
      return '';
    }

    // update persenterIndex if owner && not out of bounds
    // owner is unaffected by maxIndex
    if (Meteor.userId() === show.ownerId){
      // sends the index to update the presenterIndex and maxIndex
      Meteor.call('ownerShowUpdate', index, transition, show.showId, function (err, result) {
        if(err){
          console.log('update failed')
        } else {
          // used to dispatch store action here, use tracker instead (not optimisic)   
        }
      })

    // if not an owner... check if index ahead of owner
    } else if (index > show.maxIndex || (index === show.maxIndex && transition > show.maxTransition)){
      console.log('cannot be ahead of presenter: ', index, ' from ', show.maxIndex, ' slides')
      return '';
    // if ok, change store index without touching db
    } else {
      // increment currentIndex using set
      dispatch(setTransitionIndex(transition))
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
  currentTransition: 0,
  currentIndex: 0,
  maxIndex: 0,
  maxTransition: 0,
  numSlides: 1,
  presenterIndex: 0,
  presenterTransition: 0,
  ownerId: null,
  showId: null,
  gid: null,
  showCode: null
}

//////////////
// REDUCERS //
//////////////

export default function (state = initialState, action) {
  switch (action.type) {
  case SET_CODE: 
    return Object.assign({}, state, {showCode: action.payload})
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
  case SET_TRANSITION_INDEX:
    return Object.assign({}, state, {currentTransition: action.payload})
  case SET_MAX_TRANSITION: 
    return Object.assign({}, state, {maxTransition: action.payload}) 
  case SET_PRESENTER_TRANSITION: 
    return Object.assign({}, state, {presenterTransition: action.payload})
  default:
    return state;
  }
}
