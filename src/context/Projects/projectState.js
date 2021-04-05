import React, { useReducer } from "react";
import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import { FORM_PROJECT, GET_PROJECTS } from "../../types/index";



const ProjectState = (props) => {

  const projects = [
    { id: 1, name: "Tienda Virtual" },
    { id: 2, name: "intraner" },
    { id: 3, name: "Diseño de teinda web" },
  ];

  const initialState = {
    projects: [],
    formProject: false,
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

  return (
    <projectContext.Provider
      value={{
        projects: state.projects,
        formProject: state.formProject,
        showForm,
        getProjects,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
