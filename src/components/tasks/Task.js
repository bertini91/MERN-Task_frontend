import React, { useContext } from "react";
import taskContext from "../../context/tasks/taskContext";
import projectContext from "../../context/Projects/projectContext";

const Task = ({ task }) => {
  //Obtener el proyecto actual del context
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //Extraer el proyecto
  const [actualProject] = project;

  //Obtener, eliminar y actualizar el estado desde tareas de context
  const tasksContext = useContext(taskContext);
  const { deleteTask, getTasks, putTask, saveActualTask } = tasksContext;

  //Funcion que elimina una tarea al presionar el boton
  const deleteT = (id) => {
    deleteTask(id, actualProject._id);
    getTasks(actualProject._id);
  };

  //Funcion que modifica el estado de la tarea
  const putState = (task) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    putTask(task);
  };

  //Agrega una tarea actual cuando el usuario desea editarla
  const selectTask = (task) => {
    saveActualTask(task);
  };

  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.state ? (
          <button
            type="button"
            className="completo"
            onClick={() => putState(task)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => putState(task)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(task)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => deleteT(task._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Task;
