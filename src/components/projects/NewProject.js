import React, { Fragment, useContext, useState } from "react";
import projectContext from "../../context/Projects/projectContext";

const NewProject = () => {
  //Obtener el state del formulario del context
  const projectsContext = useContext(projectContext);
  const {
    formProject,
    errorForm,
    showForm,
    addProject,
    showError,
  } = projectsContext;

  const [project, setProject] = useState({
    name: "",
  });

  const { name } = project;

  //Lee los inputs
  const onChangeProject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  //Cuando se envia el proyecto
  const onSubmitProject = (e) => {
    e.preventDefault();

    //Validar el proyecto
    if (name === "") {
      showError();
      return;
    }

    //agrefar al state
    addProject(project);

    //Reiniciar el form
    setProject({ name: "" });
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >
        Nuevo Proyecto
      </button>
      {formProject ? (
        <form onSubmit={onSubmitProject} className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre del Proyecto"
            name="name"
            value={name}
            onChange={onChangeProject}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}
      {errorForm ? (
        <p className="mensaje error">El nombre es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NewProject;
