import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// applyMiddleware supercharges createStore with middleware:
let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// We can use it exactly like “vanilla” createStore.
let store = createStoreWithMiddleware(rootReducer);

const ADD_PREVIEWS = 'ADD_PREVIEWS';

export function addPreviews(previews) {
  return function(dispatch) {
    GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"', {}, function (err, result) {
      if (err) console.error(err);
      // Map an array of preview objects with specific properties
      var previews = result.items.map((doc) => {
        return {
          link: doc.embedLink.replace('link', 'embed'),
          title: doc.title,
          thumbnail: doc.thumbnailLink,
          gid: doc.id
        };
      });
    dispatch({
      type: ADD_PREVIEWS,
      payload: previews
    });
  }
}
