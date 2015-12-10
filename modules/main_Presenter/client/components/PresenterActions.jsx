const ADD_PREVIEWS = 'ADD_PREVIEWS';

export function addPreviews(previews) {
  return {
    type: ADD_PREVIEWS,
    payload: previews
  };
}
