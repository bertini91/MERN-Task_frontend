import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/Alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const Login = (props) => {
  //Extraer valores de context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { msg, authenticated, logIn } = authContext;

  //En caso de que el usuario o password no exista
  useEffect(() => {
     if (authenticated) {
      props.history.push("/proyectos");
    }
    if (msg) {
      showAlert(msg.msg, msg.category);
      return;
    }
    //eslint-disable-next-line
  }, [msg, authenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Pasarlo al action
    logIn({ email, password });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}> {alert.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
