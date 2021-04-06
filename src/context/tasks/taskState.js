import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import taskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  TASKS_PROJECT,
  POST_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  STATE_TASK,
  ACTUAL_TASK,
  PUT_TASK,
  CLEAN_TASK,
} from "../../types/index";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { id: 1, name: "Plantear los RQ", state: true, projectId: 1 },
      { id: 2, name: "Realizar el maquetado", state: true, projectId: 2 },
      { id: 3, name: "Realizar el modelado", state: false, projectId: 3 },
      { id: 4, name: "Elegir plataforma de pago", state: true, projectId: 4 },
      { id: 5, name: "Elegir Hosting", state: false, projectId: 1 },
      { id: 6, name: "Plantear los RQ", state: true, projectId: 2 },
      { id: 7, name: "Realizar el maquetado", state: true, projectId: 3 },
      { id: 8, name: "Realizar el modelado", state: false, projectId: 4 },
      { id: 9, name: "Elegir plataforma de pago", state: true, projectId: 1 },
      { id: 10, name: "Elegir Hosting", state: false, projectId: 2 },
      { id: 11, name: "Plantear los RQ", state: true, projectId: 3 },
      { id: 12, name: "Realizar el maquetado", state: true, projectId: 4 },
      { id: 13, name: "Realizar el modelado", state: false, projectId: 1 },
      { id: 14, name: "Elegir plataforma de pago", state: true, projectId: 2 },
      { id: 15, name: "Elegir Hosting", state: false, projectId: 3 },
    ],
    tasksProject: null,
    errorTask: false,
    selectedTask: null,
  };

  //Crear dispatch y state
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Crear funciones

  //Obtener las tareas de un proyecto
  const getTasks = (projectId) => {
    dispatch({
      type: TASKS_PROJECT,
      payload: projectId,
    });
  };

  //Agregar una tarea al proyecto seleccionado
  const addTask = (task) => {
    task.id = uuidv4();
    dispatch({
      type: POST_TASK,
      payload: task,
    });
  };

  //Valida y muestra un error si es necesario
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  //Eliminar tarea por el id
  const deleteTask = (id) => {
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  };

  //Cambiar estado de la tarea
  const putStateTask = (task) => {
    dispatch({
      type: STATE_TASK,
      payload: task,
    });
  };

  //Extrae una tarea para editar
  const saveActualTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
      payload: task,
    });
  };

  //Editar tarea
  const putTask = (task) => {
    dispatch({
      type: PUT_TASK,
      payload: task,
    });
  };

  //Elimina la tarea seleccionada
  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK,
    });
  };

  return (
    <taskContext.Provider
      value={{
        tasks: state.tasks,
        tasksProject: state.tasksProject,
        errorTask: state.errorTask,
        selectedTask: state.selectedTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        putStateTask,
        saveActualTask,
        putTask,
        cleanTask
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
