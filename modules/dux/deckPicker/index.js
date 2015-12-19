// import { Map, List } from 'immutable'
const ADD_PREVIEWS = 'ADD_PREVIEWS'

// internal action to add previews
function addPreviews (previews) {
  return {
    type: ADD_PREVIEWS,
    payload: previews
  }
}

// makes a ajax call to the google api to get preview and metadata
export function getPreviews () {
  return (dispatch, getState) => {
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
      dispatch(addPreviews(previews))
    })
  }
}

export default function reducers (state = [], action) {
  switch (action.type) {
  case 'ADD_PREVIEWS':
    return action.payload;
  default:
    return state;
  }
}
