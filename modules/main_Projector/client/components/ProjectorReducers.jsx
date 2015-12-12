import { Map, List } from 'immutable'

const initial = Map({presentation: undefined})

export default function counter(state = initial, action) {
  switch (action.type) {
  case 'SET_PRESENTATION':
    return state.set('presentation', action.payload);
  default:
    return state;
  }
}
