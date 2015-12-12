import {Map, List} from 'immutable'

const initial = Map({
  presentation: Map({gid: undefined, index: 0})
})

export default function counter(state = initial, action) {
  switch (action.type) {
  case 'NEXT_SLIDE':
    return state.updateIn(['presentation', 'index'], index => index + 1)
  case 'PREV_SLIDE':
    return state.updateIn(['presentation', 'index'], index => index - 1)
  default:
    return state;
  }
}
