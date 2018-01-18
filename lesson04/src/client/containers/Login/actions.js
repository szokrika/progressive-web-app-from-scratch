import { SENDING_REQUEST, CHANGE_FORM, LOGIN_REQUEST } from '../../redux/types';

export function sendingRequest(sending) {
  return { type: SENDING_REQUEST, sending };
}

export function changeForm(newState) {
  return { type: CHANGE_FORM, newState };
}

export function loginRequest(credentials) {
  return { type: LOGIN_REQUEST, credentials};
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
  }
}