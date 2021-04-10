import React, { useContext, useEffect } from "react";
import HeaderBar from "../layout/HeaderBar";
import Sidebar from "../layout/Sidebar";
import FormTasks from "../tasks/FormTasks";
import ListTasks from "../tasks/ListTasks";
import AuthContext from "../../context/authentication/authContext";

const Projects = () => {
  //Extraer la info de autenticacion
  const authContext = useContext(AuthContext);
  const { userAuthenticated } = authContext;

  useEffect(() => {
    userAuthenticated();
  }, []);

  return (
    <div className="contenedor-app">
      <Sidebar></Sidebar>
      <div className="seccion-principal">
        <HeaderBar></HeaderBar>
        <main>
          <FormTasks></FormTasks>
          <div className="contenedor-tareas">
            <ListTasks></ListTasks>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
