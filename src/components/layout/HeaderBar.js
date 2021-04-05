import React from "react";

const HeaderBar = () => {
  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola <span>Nicolas Bertini</span>
      </p>
      <nav className="nav-principal">
        <a href="#!">Cerrar Sesión</a>
      </nav>
    </header>
  );
};

export default HeaderBar;
