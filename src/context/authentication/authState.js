import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  REGISTRATION_APPROVED,
  REGISTRATION_ERROR,
  GET_USER,
  LOGIN_APROVED,
  LOGIN_ERROR,
  SING_OFF,
} from "../../types/index";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    authenticated: null,
    user: null,
    msg: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Las funciones

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        msg: state.msg,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
