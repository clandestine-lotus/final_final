import {Map, List} from 'immutable'

const initial = Map({
  presentation: Map({
    index: 0, 
    audience: List()
  }),
  viewer: Map({
    id: null,
    index: 0
  })
})

export default function counter(state = initial, action) {
  switch (action.type) {
  case 'SET_INDEX':
    return state.setIn(['viewer', 'index'], action.payload);
  case 'SET_VIEWER':
    return state.setIn(['viewer', 'id'], action.payload);
  case 'SET_END': 
    return state.setIn(['presentation', 'index'], action.payload);
  case 'SET_AUDIENCE':
    return state.setIn(['presentation', 'audience'], List(action.payload));
  default:
    return state;
  }
}
