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


// export function close() {
//   return {
//     type: OPEN_THREAD,
//     id: null
//   }
// }

// export function decrement() {
//   return {
//     type: DECREMENT_COUNTER
//   };
// }

// export function incrementIfOdd(counter) {
  // return (dispatch, getState) => {
  //   const { counter } = getState();
  //   if (counter % 2 === 0) {
  //     return {};
  //   }
  //   return increment();
  //   // dispatch(increment());
  // };
// }

// export function incrementAsync() {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, 1000);
//   };
// }

// reducers
export default function reducer(state = { id: null }, action) {
  switch (action.type) {
  case OPEN_THREAD:
    return {...state, id: action.id};
  default:
    return state;
  }
}
