import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Project from "./Project";
import AlertContext from "../../context/Projects/projectContext";
import projectContext from "../../context/Projects/projectContext";

const ListProject = () => {
  //Extraer proyectos de state inicial
  const projectsContext = useContext(projectContext);
  const { msg, projects, getProjects } = projectsContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  //Obtener proyecto al cargar el componente
  useEffect(() => {
    //Si hay un error
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    getProjects();
    //eslint-disable-next-line
  }, [msg]);

  // revisar si proyectos tiene contenido
  if (projects.length === 0) {
    return <p>No hay proyectos, comienza creando uno</p>;
  }

  return (
    <ul className="listado-proyectos">
      {alert ? (
        <div className={`alerta ${alert.category}`}>{alert.msg}</div>
      ) : null}
      <TransitionGroup>
        {projects.map((project) => (
          <CSSTransition key={project._id} timeout={200} classNames="proyecto">
            <Project project={project}></Project>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProject;
