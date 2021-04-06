import React, { useContext } from "react";
import projectContext from "../../context/Projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const Project = ({ project }) => {
  //Obtener el state del formulario del context
  const projectsContext = useContext(projectContext);
  const { actualProject } = projectsContext;

  //Obtener la funcion de context tarea
  const tasksContext = useContext(taskContext);
  const { getTasks } = tasksContext;

  //Funcion para agregar el proyecto actual
  const selectProject = (id) => {
    actualProject(id); //Fijar un proyecto actual
    getTasks(id); //Filtrar las tareas
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => selectProject(project.id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
