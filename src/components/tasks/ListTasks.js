import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Task from "./Task";
import projectContext from "../../context/Projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const ListTasks = () => {
  //Extraer proyectos de state inicial
  const projectsContext = useContext(projectContext);
  const { project, deleteProject } = projectsContext;

  //Obtener las tareas de context
  const tasksContext = useContext(taskContext);
  const { tasksProject } = tasksContext;

  //Si no hay seleccionado un proyecto
  if (!project) {
    return <h2>Selecciona un proyecto</h2>;
  }

  //Array destructuring para extraer el proyecto actual
  const [actualProject] = project;

  return (
    <Fragment>
      <h2>Proyecto: {actualProject.name}</h2>
      <ul className="listado-tareas">
        {tasksProject.length === 0 ? (
          <li className="tarea">No hay Tareas</li>
        ) : (
          <TransitionGroup>
            {tasksProject.map((task) => (
              <CSSTransition key={task.id} timeout={200} classNames="tarea">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => deleteProject(actualProject.id)}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListTasks;
