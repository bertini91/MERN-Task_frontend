import React, { useReducer } from "react";
import taskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  TASKS_PROJECT,
  POST_TASK,
  VALIDATE_TASK,
  DELETE_TASK,
  ACTUAL_TASK,
  PUT_TASK,
  CLEAN_TASK,
  SHOW_ALERT,
} from "../../types/index";
import clientAxios from "../../config/axios";
const TaskState = (props) => {
  const initialState = {
    tasksProject: [],
    errorTask: false,
    selectedTask: null,
  };

  //Crear dispatch y state
  const [state, dispatch] = useReducer(taskReducer, initialState);

  //Crear funciones

  //Obtener las tareas de un proyecto
  const getTasks = async (project) => {
    try {
      const response = await clientAxios.get("/api/tareas", {
        params: { project },
      });
      dispatch({
        type: TASKS_PROJECT,
        payload: response.data.tasks,
      });
    } catch (error) {
      console.log(error);
      const alert = {
        msg: "Hubo un error",
        category: "alerta-error",
      };
      dispatch({
        type: SHOW_ALERT,
        payload: alert,
      });
    }
  };

  //Agregar una tarea al proyecto seleccionado
  const addTask = async (task) => {
    try {
      const response = await clientAxios.post("/api/tareas", task);
      console.log(response.data);
      dispatch({
        type: POST_TASK,
        payload: task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Valida y muestra un error si es necesario
  const validateTask = () => {
    dispatch({
      type: VALIDATE_TASK,
    });
  };

  //Eliminar tarea por el id
  const deleteTask = async (id, project) => {
    try {
      await clientAxios.delete(`/api/tareas/${id}`, { params: { project } });
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* //Cambiar estado de la tarea
  const putStateTask = (task) => {
    dispatch({
      type: STATE_TASK,
      payload: task,
    });
  }; */
  //Editar tarea
  const putTask = async (task) => {
    console.log(task);
    try {
      const response = await clientAxios.put(`/api/tareas/${task._id}`, task);
      dispatch({
        type: PUT_TASK,
        payload: response.data.taskObj,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Extrae una tarea para editar
  const saveActualTask = (task) => {
    dispatch({
      type: ACTUAL_TASK,
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
        tasksProject: state.tasksProject,
        errorTask: state.errorTask,
        selectedTask: state.selectedTask,
        getTasks,
        addTask,
        validateTask,
        deleteTask,
        saveActualTask,
        putTask,
        cleanTask,
      }}
    >
      {props.children}
    </taskContext.Provider>
  );
};

export default TaskState;
