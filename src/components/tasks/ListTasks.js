import React, { Fragment, useContext } from "react";
import Task from "./Task";
import projectContext from "../../context/Projects/projectContext";

const ListTasks = () => {
  //Extraer proyectos de state inicial
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  //Si no hay seleccionado un proyecto
  if (!project) {
    return <h2>Selecciona un proyecto</h2>;
  }

  //Array destructuring para extraer el proyecto actual
  const [actualProject] = project;

  const tasksProject = [
    { name: "Plantear los RQ", state: true },
    { name: "Realizar el maquetado", state: true },
    { name: "Realizar el modelado", state: false },
    { name: "Elegir plataforma de pago", state: true },
    { name: "Elegir Hosting", state: false },
  ];

  return (
    <Fragment>
      <h2>Proyecto: {actualProject.name}</h2>
      <ul className="listado-tareas">
        {tasksProject.length === 0 ? (
          <li className="tarea">No hay Tareas</li>
        ) : (
          tasksProject.map((task) => <Task key={task.name} task={task}></Task>)
        )}
      </ul>
      <button type="button" className="btn btn-eliminar" onClick={()=> deleteProject(actualProject.id)} >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListTasks;
