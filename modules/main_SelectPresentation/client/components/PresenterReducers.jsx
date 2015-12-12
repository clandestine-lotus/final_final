import { Map, List } from 'immutable'

const initial = Map({previews: List(), presentation: undefined})

export default function counter(state = initial, action) {
  switch (action.type) {
  case 'ADD_PREVIEWS':
    return state.set('previews', List(action.payload));
  case 'SET_PRESENTATION':
    return state.set('presentation', action.payload);
  default:
    return state;
  }
}
