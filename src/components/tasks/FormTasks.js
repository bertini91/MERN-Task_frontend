import React, { useContext } from "react";
import projectContext from "../../context/Projects/projectContext";

const FormTasks = () => {
  //Extraer si un proyecto esta activo
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //Si no hay seleccionado un proyecto
  if (!project) {
    return null;
  }

  //Array destructuring para extraer el proyecto actual
  const [actualProject] = project;

  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="name"
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value="Agregar Tarea"
          />
        </div>
      </form>
    </div>
  );
};

export default FormTasks;
