import { useReducer } from "react";
import alertContext from "./alertContext";
import alertReucer from "./alertReducer";
import { SHOW_ALERT, HIDE_ALERT } from "../../types/index";

const AlertState = (props) => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(alertReucer, initialState);

  //Funciones
  const showAlert = (msg, category) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        msg,
        category,
      },
    });
    console.log(initialState);

    //Despues de 5seg se limpia la alerta
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 5000);
  };

  return (
    <alertContext.Provider value={{ alert: state.alert, showAlert }}>
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
