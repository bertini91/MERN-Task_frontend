import React, { useContext, useEffect } from "react";
import Project from "./Project";
import projectContext from "../../context/Projects/projectContext";

const ListProject = () => {
  //Extraer proyectos de state inicial
  const projectsContext = useContext(projectContext);
  const { projects, getProjects } = projectsContext;

  //Obtener proyecto al cargar el componente
  useEffect(() => {
    getProjects();
  }, []);

  // revisar si proyectos tiene contenido
  if (projects.length === 0) {
    return <p>No hay proyectos, comienza creando uno</p>;
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
