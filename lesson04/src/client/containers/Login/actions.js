import { LOGIN_REQUEST } from '../../redux/constants';

export function loginRequest(username, password) {
  return { type: LOGIN_REQUEST, load: { username, password } };
}
/*
export function login(username, password) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
  }
}
*/