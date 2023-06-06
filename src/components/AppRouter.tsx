import { Switch, Route, Redirect } from "react-router-dom";
import { routes, USER_SLICE_ROUTE } from "../routes";

const AppRouter = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} component={route.Component} exact />
      ))}

      <Redirect to={USER_SLICE_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
