export default function counter(state = {previews: []}, action) {
  switch (action.type) {
  case 'ADD_PREVIEWS':
    return Object.assign({}, state, {previews: action.payload});
  default:
    return state;
  }
}
