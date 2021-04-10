import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/authContext";

const HeaderBar = () => {
  //Extraer la info de autenticacion
  const authContext = useContext(AuthContext);
  const { user, userAuthenticated, singOff } = authContext;

  useEffect(() => {
    userAuthenticated();
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hola <span>{user.name}</span>
        </p>
      ) : null}
      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => singOff()}
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
};

export default HeaderBar;
