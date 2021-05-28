import { APIUrls } from '../helpers/urls';
import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAIL,
  USER_PROFILE_SUCCESS,
} from './actiontypes';

export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFail(error) {
  return {
    type: USER_PROFILE_FAIL,
    error,
  };
}

export function startFetchUserProfile() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function fetchUserProfile(userId) {
  return (dispatch) => {
    dispatch(startFetchUserProfile());
    const url = APIUrls.userProfile(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(userProfileSuccess(data.data.user));
          return;
        }
        dispatch(userProfileFail(data.message));
      });
  };
}
