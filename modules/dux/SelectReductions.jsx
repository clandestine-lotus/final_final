/*
==============================
    Types
==============================
 */

const ADD_PREVIEWS = 'ADD_PREVIEWS'
const SET_PRESENTATION = 'SET_PRESENTATION'


/*
==============================
    Actions
==============================
 */

export function addPreviews (previews) {
  return {
    type: ADD_PREVIEWS,
    payload: previews
  }
}

export function getPreviews () {
  return (dispatch, getState) => {
    GoogleApi.get('drive/v2/files?q=mimeType="application/vnd.google-apps.presentation"', {}, function (err, result) {
      if (err) console.error(err)
      // Map an array of preview objects with specific properties
      var previews = result.items.map((doc) => {
        return {
          link: doc.embedLink.replace('link', 'embed'),
          title: doc.title,
          thumbnail: doc.thumbnailLink,
          gid: doc.id
        }
      })
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


/*
==============================
    Reducer
==============================
 */

import { Map, List } from 'immutable'

const initial = Map({
  list: List(),
  presentation: undefined,
})

export default (state = initial, action) => {
  switch (action.type) {
  case ADD_PREVIEWS:
    return state.set('list', List(action.payload))
  case SET_PRESENTATION:
    return state.set('presentation', action.payload)
  default:
    return state
  }
}
