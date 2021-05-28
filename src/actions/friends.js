import { APIUrls } from '../helpers/urls';
import { FETCH_FRIENDS_SUCCESS } from './actiontypes';

export function fetchFriends() {
  return (dispatch) => {
    const url = APIUrls.userFriends();
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Remove Auth if not required
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('friends data', data.data.friends);
        dispatch(fetchFriendsSuccess(data.data.friends));
      });
  };
}

export function fetchFriendsSuccess(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}
