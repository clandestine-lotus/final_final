import {Map} from 'immutable'

function setState(state, newState) {
  return state.merge(newState);
}

const initial = Map({
  index: 0,
  presentation: undefined
})

export default function counter( state = initial, action) {
  let index = state.get('index')
  switch (action.type) {
  case 'NEXT_SLIDE':
    return state.set('index', index+1)
  case 'PREV_SLIDE':
    return state.set('index', index-1)
  default:
    return state;
  }
}
