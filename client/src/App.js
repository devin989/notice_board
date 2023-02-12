import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import NewNotice from "./notices/pages/NewNotice";
import Notices from "./notices/pages/Notices";
import Auth from "./auth/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId, userType } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Notices />
        </Route>
        <Route path="/places/new" exact>
          <NewNotice />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Auth />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        userType: userType,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
