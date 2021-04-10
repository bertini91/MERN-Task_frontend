import React, { useReducer } from "react";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  FORM_PROJECT,
  GET_PROJECTS,
  POST_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT,
} from "../../types/index";
import clientAxios from "../../config/axios";

const ProjectState = (props) => {
  const initialState = {
    projects: [],
    formProject: false,
    errorForm: false,
    project: null,
    msg: null
  };
  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //Serie de funciones para el CRUD
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT,
    });
  };

  //Obtener los proyectos
  const getProjects = async () => {
    try {
      const response = await clientAxios.get("/api/proyectos");

      dispatch({ type: GET_PROJECTS, payload: response.data.projects });
    } catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      })
    }
  };

  //Agregar nuevo proyecto
  const addProject = async (project) => {
    try {
      const response = await clientAxios.post("/api/proyectos", project);
      console.log(response);
      //Insertar el proyecto en el state
      dispatch({ type: POST_PROJECT, payload: response.data });
    } catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      })
    }
  };

  //Validar formulario por errores
  const showError = () => {
    dispatch({ type: VALIDATE_FORM });
  };

  // Selecciona el proyecto que se hizo click
  const actualProject = (projectId) => {
    dispatch({
      type: ACTUAL_PROJECT,
      payload: projectId,
    });
  };

  //Elimina un proyecto
  const deleteProject = async (projectId) => {
    try {
      await clientAxios.delete(`/api/proyectos/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      const alert = {
        msg: 'Hubo un error',
        category: 'alerta-error'
      }
      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      })
    }
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        formProject: state.formProject,
        errorForm: state.errorForm,
        project: state.project,
        msg: state.msg,
        showForm,
        getProjects,
        addProject,
        showError,
        actualProject,
        deleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
