import Presentations from '../../../main_SelectPresentation/globals/collections'

const SET_PRESENTATION = 'SET_PRESENTATION';
const SET_SLIDE = 'SET_SLIDE';

export function setPresentation(id) {
  return {
    type: SET_PRESENTATION,
    payload: id
  }
}

export function setSlide(index) {
  return {
    type: SET_SLIDE,
    payload: index
  }
}
