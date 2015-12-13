import { Map, List } from 'immutable'

const initial = Map({presentation: undefined, slide: 0})

export default function counter(state = initial, action) {
  switch (action.type) {
  case 'SET_PRESENTATION':
    return state.set('presentation', action.payload);
  case 'SET_SLIDE':
    return state.set('slide', action.payload);
  default:
    return state;
  }
}
