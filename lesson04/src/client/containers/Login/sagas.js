import { take, call, pull } from 'react-redux/effects';
import {}

function* authorize(username, password) {
  try {
    const token = yield call(Api.authorize, user, password);
  } catch(error) {
      yield put({ type: })
  }
}