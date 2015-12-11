export default function counter(state = [], action) {
  switch (action.type) {
  case 'ADD_PREVIEWS':
    return Object.assign([], state, action.payload);
  default:
    return state;
  }
}
