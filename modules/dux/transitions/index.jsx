const SET_TRANSITIONS = 'SET_TRANSITIONS'


export function setTransitions (transitions) {
  return { 
    type: SET_TRANSITIONS,
    payload: transitions
  }
}

export default function reducer (state = [], action) {
  switch(action.type) {
    case SET_TRANSITIONS: 
      return Object.assign([], action.payload)
    default: 
      return state
  }
}
