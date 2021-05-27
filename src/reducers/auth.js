import {
  AUTHENTICATE_USER,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_AUTH_STATE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  EDIT_USER_FAIL,
  EDIT_USER_SUCCESS,
} from '../actions/actiontypes';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        isLoggedIn: true,
        error: null,
        user: action.user,
      };
    case LOGIN_FAILED:
    case SIGNUP_FAILED:
      return {
        ...state,
        inProgress: false,
        error: action.error,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: false,
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
