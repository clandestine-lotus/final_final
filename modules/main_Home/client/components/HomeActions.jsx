const SUBMIT_CODE = 'SUBMIT_CODE';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const INITIALIZE = 'INITIALIZE';

export function submitCode(code) {
  return {
    type: SUBMIT_CODE,
    payload: code
  };
}

export function login() {
  return {
    type: LOGIN,
    payload: {loggedIn: true}
  }
}

export function logout() {
  return {
    type: LOGOUT,
    payload: {loggedIn: false}
  }
}

export function initialize() {
  return {
    type: INITIALIZE,
    payload: {initialized: true}
  }
}
