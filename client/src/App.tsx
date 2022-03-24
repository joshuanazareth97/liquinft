import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routeList.map(({ Component, ...route }) => {
          return (
            <Route
              path={route.url}
              element={
                route.protected ? (
                  <ProtectedRoute isAuth={false}>
                    <Component />
                  </ProtectedRoute>
                ) : (
                  <Component />
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
