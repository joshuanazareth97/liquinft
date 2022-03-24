import { ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "routes";
import { theme } from "Theme";
import "./App.css";
import { store } from "store";
import { Provider } from "react-redux";

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
