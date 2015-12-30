/*
==============================
    Constant definitions
==============================
 */

const SUBMIT_PACE = 'SUBMIT_PACE'

/*
==============================
    Actions
==============================
 */

export const votePace = function(paceDelta) {
  return {
    type: SUBMIT_PACE,
    payload: paceDelta
  }
}

/*
==============================
    Reducer
==============================
 */
import { Map } from 'immutable'

const initial = Map({currentPace: 0})

export default (state = initial, action) => {
  switch (action.type) {
  case SUBMIT_PACE:
    return state.set('currentPace', action.payload);
  default:
    return state;
  }
}
