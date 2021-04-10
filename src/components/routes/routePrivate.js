import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/authentication/authContext";

const RoutePrivate = ({ component: Component, ...props }) => {
  //Extraer la info de autenticacion
  const authContext = useContext(AuthContext);
  const {userAuthenticated, authenticated, loading } = authContext;

  useEffect(() => {
    userAuthenticated();
  }, []);

  /* console.log(userAuthenticated); */
  return (
    <Route
      {...props}
      render={(props) =>
        !authenticated && !loading ? (
          <Redirect to="/"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default RoutePrivate;
