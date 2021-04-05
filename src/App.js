import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";
import ProjectState from "./context/Projects/projectState";

function App() {
  return (
    <ProjectState>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route exact path="/nueva-cuenta" component={NewAccount}></Route>
          <Route exact path="/proyectos" component={Projects}></Route>
        </Switch>
      </Router>
    </ProjectState>
  );
}

export default App;
