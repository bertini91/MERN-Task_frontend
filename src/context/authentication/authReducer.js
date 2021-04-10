import {
  REGISTRATION_APPROVED,
  REGISTRATION_ERROR,
  GET_USER,
  LOGIN_APROVED,
  LOGIN_ERROR,
  SING_OFF,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case REGISTRATION_APPROVED:
    case LOGIN_APROVED:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        authenticated: true,
        msg: null,
        loading: false,
      };
    case REGISTRATION_ERROR:
    case SING_OFF:
    case LOGIN_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        authenticated: null,
        msg: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
