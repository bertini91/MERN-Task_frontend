import React, { useContext, useEffect } from "react";
import Project from "./Project";
import projectContext from "../../context/Projects/projectContext";

const ListProject = () => {
  //Extraer proyectos de state inicial
  const projectsContext = useContext(projectContext);
  console.log(projectsContext.projects);
  const { projects, getProjects } = projectsContext;

  //Obtener proyecto al cargar el componente
  useEffect(() => {
    getProjects();
  }, []);

  // revisar si proyectos tiene contenido
  if (projects.length === 0) {
    return null;
  }

  return (
    <ul className="listado-proyectos">
      {projects.map((project) => (
        <Project key={project.id} project={project}></Project>
      ))}
    </ul>
  );
};

export default ListProject;
