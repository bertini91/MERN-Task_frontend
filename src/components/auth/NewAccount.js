import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/Alerts/alertContext";
import AuthContext from "../../context/authentication/authContext";

const NewAccount = (props) => {
  //Extraer valores de context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { msg, authenticated, registerUser } = authContext;

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const { name, email, password, confirm } = user;

  //En caso de que el usuario se haga autenticado o registrado
  useEffect(() => {
    if (authenticated) {
      props.history.push("/proyectos");
    }
    if(msg){
      showAlert(msg.msg, msg.category);
      return;
    }
    //eslint-disable-next-line
  }, [msg, authenticated, props.history]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirm.trim() === ""
    ) {
      showAlert("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Password minimo de 6 caracteres
    if (password.length < 6) {
      showAlert(
        "El password debe ser de al menos seis caracteres",
        "alerta-error"
      );
      return;
    }

    //Password iguales
    if (password !== confirm) {
      showAlert("Los password NO son iguales", "alerta-error");
      return;
    }

    //Pasarlo al action
    registerUser({ name, email, password });
  };

  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}> {alert.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Nuevo usuario</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              value={name}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="confirm">Confirmar Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repite tu password"
              value={confirm}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrar"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
