import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  FORM_PROJECT,
  GET_PROJECTS,
  POST_PROJECT,
  VALIDATE_FORM,
  ACTUAL_PROJECT,
  DELETE_PROJECT,
} from "../../types/index";

const ProjectState = (props) => {
  const projects = [
    { id: 1, name: "Tienda Virtual" },
    { id: 2, name: "intraner" },
    { id: 3, name: "Diseño de teinda web" },
  ];

  const initialState = {
    projects: [],
    formProject: false,
    errorForm: false,
    project: null,
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
  const getProjects = () => {
    dispatch({ type: GET_PROJECTS, payload: projects });
  };

  //Agregar nuevo proyecto
  const addProject = (project) => {
    project.id = uuidv4();
    console.log(project);

    //Insertar el proyecto en el state
    dispatch({ type: POST_PROJECT, payload: project });
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
  const deleteProject = (projectId) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId,
    });
  };

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        formProject: state.formProject,
        errorForm: state.errorForm,
        project: state.project,
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
