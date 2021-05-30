import { FETCH_SEARCH_RESULTS } from '../actions/actiontypes';

const initialSearchState = {
  results: [],
};

export default function search(state = initialSearchState, action) {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      return {
        ...state,
        results: action.users,
      };
    default:
      return state;
  }
}
