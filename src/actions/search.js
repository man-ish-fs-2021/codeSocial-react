import { APIUrls } from '../helpers/urls';
import {  FETCH_SEARCH_RESULTS } from './actiontypes';

export function searchUser(searchText) {
  return (dispatch) => {
    const url = APIUrls.searchResults(searchText);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(searchResultSuccess(data.data.users));
          return;
        } else {
          dispatch(searchResultSuccess([]));
        }
      });
  };
}

export function searchResultSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS,
    users,
  };
}
