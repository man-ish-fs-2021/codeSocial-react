import { APIUrls } from '../helpers/urls';
import {
  ADD_FRIEND,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from './actiontypes';

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
        // console.log('friends data', data);
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

export function addFriend(friend) {
  return {
    type: ADD_FRIEND,
    friend,
  };
}

export function removeFriend(userId) {
  return {
    type: REMOVE_FRIEND,
    userId,
  };
}
