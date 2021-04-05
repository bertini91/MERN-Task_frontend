import React from "react";
import HeaderBar from "../layout/HeaderBar";
import Sidebar from "../layout/Sidebar";
import FormTasks from "../tasks/FormTasks";
import ListTasks from "../tasks/ListTasks";

const Projects = () => {
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
