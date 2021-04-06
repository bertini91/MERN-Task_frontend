import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Project from "./Project";
import projectContext from "../../context/Projects/projectContext";

const ListProject = () => {
  //Extraer proyectos de state inicial
  const projectsContext = useContext(projectContext);
  const { projects, getProjects } = projectsContext;

  //Obtener proyecto al cargar el componente
  useEffect(() => {
    getProjects();
    //eslint-disable-next-line
  }, []);

  // revisar si proyectos tiene contenido
  if (projects.length === 0) {
    return <p>No hay proyectos, comienza creando uno</p>;
  }

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project.id} timeout={200} classNames="proyecto">
            <Project project={project}></Project>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProject;
