import {Map, List} from 'immutable'

const initial = Map({loggedIn: false, presentationCode: null})

export default function HomeReducers(state = initial, action) {
  switch (action.type) {
  case 'SUBMIT_CODE':
    return state.set('presentationCode', action.payload);
  case 'LOGIN':
    return state.set('loggedIn', true);
  case 'LOGOUT':
    return state.set('loggedIn', false);
  default:
    return state;
  }
}
