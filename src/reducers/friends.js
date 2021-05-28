import { FETCH_FRIENDS_SUCCESS } from '../actions/actiontypes';

const defaultFriendsState = [];
export function friends(state = defaultFriendsState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return [...action.friends];
    default:
      return state;
  }
}
