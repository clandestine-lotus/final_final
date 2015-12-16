import {Map, List} from 'immutable'

const initial = Map({
  presentation: Map({
    index: 0
  }),
  viewer: Map({
    id: null
  })
})

export default function counter(state = initial, action) {
  switch (action.type) {
  case 'SET_INDEX':
    return state.setIn(['presentation', 'index'], action.payload);
  case 'SET_VIEWER':
    return state.setIn(['viewer', 'id'], action.payload);
  default:
    return state;
  }
}
