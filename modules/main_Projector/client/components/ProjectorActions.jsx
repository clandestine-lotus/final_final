import Presentations from '../../../main_SelectPresentation/globals/collections'

const SET_PRESENTATION = 'SET_PRESENTATION';
const SET_PAGE = 'SET_PAGE';

export function setPresentation(id) {
  return {
    type: SET_PRESENTATION,
    payload: id
  }
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page
  }
}
