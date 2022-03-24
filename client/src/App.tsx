import { ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "routes";
import { store } from "store";
import { theme } from "theme";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </Provider>
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
