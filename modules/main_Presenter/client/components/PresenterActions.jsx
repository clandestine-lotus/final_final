const ADD_PREVIEWS = 'ADD_PREVIEWS';
const NEXT_SLIDE = 'NEXT_SLIDE';
const PREV_SLIDE = 'PREV_SLIDE';
const SET_INDEX = 'SET_INDEX';

export function addPreviews (previews) {
  return {
    type: ADD_PREVIEWS,
    payload: previews
  }
}

export function nextSlide() {
  return { 
    type: NEXT_SLIDE
  }
}

export function prevSlide() { 
  return { 
    type: PREV_SLIDE
  }
}

export function setIndex (index) { 
  return {
    type: SET_INDEX,
    payload: index
  }
}

