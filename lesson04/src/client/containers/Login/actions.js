import { LOGIN_REQUEST } from '../../redux/constants';

export function loginRequest() {
  return { type: LOGIN_REQUEST};
}
/*
export function login(username, password) {
  return (dispatch) => {
    dispatch(sendingRequest(true));
  }
}
*/