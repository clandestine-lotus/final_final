import {Map, List} from 'immutable'

const initial = Map({
  presentation: Map({gid: undefined, index: 0})
})

export default function counter(state = initial, action) {
  switch (action.type) {
  case 'SET_INDEX':
    return state.setIn(['presentation', 'index'], action.payload)
  default:
    return state;
  }
}
