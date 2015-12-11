const SUBMIT_CODE = 'SUBMIT_CODE';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export function submitCode(code) {
  return {
    type: SUBMIT_CODE,
    payload: code
  };
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
