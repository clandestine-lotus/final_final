/*
==============================
    Types
==============================
 */

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const CODE_VALIDATION = 'CODE_VALIDATION'
const CONTROL_SELECT = 'CONTROL_SELECT'


/*
==============================
    Actions
==============================
 */

export function codeValidation(valid) {
  return {
    type: CODE_VALIDATION,
    payload: valid
  }
}

export function login() {
  return {
    type: LOGIN,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function openSelect(isOpen) {
  return {
    type: CONTROL_SELECT,
    payload: isOpen
  }
}


export function checkCode (show) {
  return function (dispatch) {
    let newState 
    if (show){
      let presenter = (Meteor.userId() === show.ownerId)
      newState = {
        invalidCode: false,
        presenter: presenter,
        presentationCode: show._id
      }
    } else {
      newState = {
        invalidCode: true
      }
    }
    dispatch(codeValidation(newState))
  }
}


/*
==============================
    Reducer
==============================
 */

import {Map} from 'immutable'

const initial = Map({
  loggedIn: false,
  presentationCode: null,
  invalidCode: false,
  presenter: false,
  showSelect: false,
})

export default (state = initial, action) => {
  switch (action.type) {
  case CODE_VALIDATION:
    return state.merge(Map(action.payload))
  case LOGIN:
    return state.set('loggedIn', true)
  case LOGOUT:
    return state.set('loggedIn', false)
  case CONTROL_SELECT:
    return state.set('showSelect', action.payload)
  default:
    return state;
  }
}
