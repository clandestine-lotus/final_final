export default function HomeReducers(state = {}, action) {
  switch (action.type) {
  case 'SUBMIT_CODE':
    return Object.assign({}, state, {presentationCode: action.payload});
  case 'LOGIN':
    return Object.assign({}, state, action.payload);
  case 'LOGOUT':
    return Object.assign({}, state, action.payload);
  case 'INITIALIZE':
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
}
