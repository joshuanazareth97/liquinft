import { ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "routes";
import { theme } from "Theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
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
};

export default App;
