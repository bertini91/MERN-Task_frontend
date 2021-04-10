import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Projects from "./components/projects/Projects";
import ProjectState from "./context/Projects/projectState";
import TaskState from "./context/tasks/taskState";
import AlertState from "./context/Alerts/alertState";
import AuthState from "./context/authentication/authState";
import tokenAuth from "./config/token";
import RoutePrivate from "./components/routes/routePrivate";

//Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route
                  exact
                  path="/nueva-cuenta"
                  component={NewAccount}
                ></Route>
                <RoutePrivate
                  exact
                  path="/proyectos"
                  component={Projects}
                ></RoutePrivate>
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
