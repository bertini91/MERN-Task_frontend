import React, { Fragment } from "react";
import Task from "./Task";

const ListTasks = () => {
  const tasksProject = [
    { name: "Plantear los RQ", state: true },
    { name: "Realizar el maquetado", state: true },
    { name: "Realizar el modelado", state: false },
    { name: "Elegir plataforma de pago", state: true },
    { name: "Elegir Hosting", state: false },
  ];

  return (
    <Fragment>
      <h2>Proyecto: Tienda Virtual</h2>
      <ul className="listado-tareas">
        {tasksProject.length === 0 ? (
          <li className="tarea">No hay Tareas</li>
        ) : (
          tasksProject.map((task) => <Task key={task.name} task={task}></Task>)
        )}
      </ul>
      <button type="button" className="btn btn-eliminar">
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListTasks;
