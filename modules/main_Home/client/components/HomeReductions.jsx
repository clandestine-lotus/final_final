/*
==============================
    Actions
==============================
 */

const SUBMIT_CODE = 'SUBMIT_CODE'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const CODE_VALIDATION = 'CODE_VALIDATION'
const CONTROL_SELECT = 'CONTROL_SELECT'

export function submitCode(code) {
  return {
    type: SUBMIT_CODE,
    payload: code
  }
}

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


/*
==============================
    Reducers
==============================
 */

import {Map} from 'immutable'

const initial = Map({
  loggedIn: false,
  presentationCode: null,
  invalidCode: false,
  showSelect: false,
})

export default (state = initial, action) => {
  switch (action.type) {
  case SUBMIT_CODE:
    return state.set('presentationCode', action.payload)
  case CODE_VALIDATION:
    return state.set('invalidCode', action.payload)
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
