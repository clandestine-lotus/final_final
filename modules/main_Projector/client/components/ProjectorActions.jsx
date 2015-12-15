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
