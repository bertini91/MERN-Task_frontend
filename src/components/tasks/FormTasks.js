import React, { useContext, useEffect, useState } from "react";
import projectContext from "../../context/Projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const FormTasks = () => {
  //Extraer si un proyecto esta activo
  const projectsContext = useContext(projectContext);
  const { project } = projectsContext;

  //Obtener desde context
  const tasksContext = useContext(taskContext);
  const {
    selectedTask,
    errorTask,
    addTask,
    validateTask,
    getTasks,
    putTask,
    cleanTask,
  } = tasksContext;

  //Effect para detectar la tarea seleccionar
  useEffect(() => {
    if (selectedTask !== null) {
      setTask(selectedTask);
    } else {
      setTask({ name: "" });
    }
  }, [selectedTask]);

  //State del form
  const [task, setTask] = useState({ name: "" });

  //Extraer el nombre del proyecto
  const { name } = task;

  //Si no hay seleccionado un proyecto
  if (!project) {
    return null;
  }

  //Array destructuring para extraer el proyecto actual
  const [actualProject] = project;

  //Leer los valores del form
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  //Agregar tarea
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (name.trim() === "") {
      validateTask();
      return;
    }

    //Revisar si es editar o nueva tarea
    if (selectedTask === null) {
      //Agregar la tarea al state
      task.state = false;
      task.projectId = actualProject.id;
      addTask(task);
    } else {
      //Actualizar la tarea existente
      putTask(task);
      //Elimina la tarea seleccionada del state
      cleanTask();
    }

    //Obtener y filtrar las tareas del proyecto actual
    getTasks(actualProject.id);

    //reiniciar el form
    setTask({ name: "" });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={selectedTask ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTask ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTasks;
