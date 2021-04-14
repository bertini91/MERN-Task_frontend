import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import clientAxios from "../../config/axios";
import tokenAuth from "../../config/token";

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
    loading: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Las funciones
  const registerUser = async (data) => {
    try {
      const response = await clientAxios.post("/api/usuarios", data);
      /* console.log(response.data); */
      dispatch({
        type: REGISTRATION_APPROVED,
        payload: response.data,
      });

      //Obtener el usuario
      userAuthenticated();
    } catch (error) {
      /* console.log(error.response.data.msg); */
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({ type: REGISTRATION_ERROR, payload: alert });
    }
  };

  //retorna el usuario autenticado
  const userAuthenticated = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //TODO: Funcion para enviar el token por headers
      tokenAuth(token);
    }
    try {
      const response = await clientAxios.get("/api/auth");
      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      console.log(error)
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({ type: LOGIN_ERROR, payload: alert });
    }
  };

  //cuando el usuario inicia sesion
  const logIn = async (data) => {
    try {
      const response = await clientAxios.post("/api/auth", data);
      dispatch({
        type: LOGIN_APROVED,
        payload: response.data,
      });
      //Obtener el usuario
      userAuthenticated();
    } catch (error) {
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error",
      };
      dispatch({ type: LOGIN_ERROR, payload: alert });
    }
  };

  //Cerrar Sesion
  const singOff = async (data) => {
    dispatch({
      type: SING_OFF,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        loading: state.loading,
        user: state.user,
        msg: state.msg,
        registerUser,
        logIn,
        userAuthenticated,
        singOff,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
