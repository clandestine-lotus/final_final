const SUBMIT_CODE = 'SUBMIT_CODE';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const CODE_VALIDATION = 'CODE_VALIDATION';

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
