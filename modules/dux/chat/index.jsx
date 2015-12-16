const OPEN_THREAD = 'OPEN_THREAD';

// actions
export function expand(threadId, stateId) {
  let output;
  if (threadId === stateId){
    output = {
      type: OPEN_THREAD,
      id: null
    }
  } else {
    output = {
      type: OPEN_THREAD,
      id: threadId
    }
  }
  return output
}

// reducers
export default function reducer(state = { id: null }, action) {
  switch (action.type) {
  case OPEN_THREAD:
    return {...state, id: action.id};
  default:
    return state;
  }
}
