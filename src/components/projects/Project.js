import React, { useContext } from "react";
import projectContext from "../../context/Projects/projectContext";

const Project = ({ project }) => {
  //Obtener el state del formulario del context
  const projectsContext = useContext(projectContext);
  const { actualProject } = projectsContext;

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => actualProject(project.id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
