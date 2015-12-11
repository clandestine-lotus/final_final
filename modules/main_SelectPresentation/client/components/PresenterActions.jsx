// import Presentations from '../../globals/collections'

const ADD_PREVIEWS = 'ADD_PREVIEWS';
const SET_PRESENTATION = 'SET_PRESENTATION';


export function addPreviews (previews) {
  return {
    type: ADD_PREVIEWS,
    payload: previews
  }
}

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
      console.log(previews);
      dispatch(addPreviews(previews))
    })
  }
}

export function setPresentation(id) {
  return {
    type: SET_PRESENTATION,
    payload: id
  }
}
