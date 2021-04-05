import React from "react";
import ListProject from "../projects/ListProject";
import NewProject from "../projects/NewProject";

const Sidebar = () => {
  return (
    <aside>
      <h1>
        MERN <span>Task</span>{" "}
      </h1>
      <NewProject></NewProject>
      <div className="proyectos">
        <h2>Tus proyectos</h2>
        <ListProject></ListProject>
      </div>
    </aside>
  );
};

export default Sidebar;
