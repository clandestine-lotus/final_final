export default function HomeReducers(state = {}, action) {
  switch (action.type) {
  case 'SUBMIT_CODE':
    return Object.assign({}, state, {presentationCode: action.payload});
  case 'LOGIN':
    return Object.assign({}, state, {loggedIn: true});
  case 'LOGOUT':
    return Object.assign({}, state, {loggedIn: false});
  default:
    return state;
  }
}
