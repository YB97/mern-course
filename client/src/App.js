import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/Auth.Context";
import { Navbar } from "./components/NavBar";
import { Loader } from "./components/Loader";

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthentificated = Boolean(token);
  const routes = useRoutes(isAuthentificated);

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthentificated
      }}
    >
      <Router>
        {isAuthentificated && <Navbar />}
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
