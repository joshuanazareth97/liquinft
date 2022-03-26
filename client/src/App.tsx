import { ThemeProvider } from "@mui/material/styles";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import DefaultLayout from "layouts/DefaultLayout/DefaultLayout";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { routeList } from "routes";
import { store } from "store";
import { theme } from "theme";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorScreen from "pages/ErrorScreen/ErrorScreen";

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
        {routeList.map(({ Component, LayoutElement, ...route }) => {
          return (
            <Route
              key={route.url}
              element={LayoutElement ? <LayoutElement /> : <DefaultLayout />}
            >
              <Route
                path={route.url}
                element={
                  route.protected ? (
                    <ProtectedRoute isAuth={true}>
                      <Component />
                    </ProtectedRoute>
                  ) : (
                    <Component />
                  )
                }
              />
            </Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default () => {
  // const notify = () => toast("Wow so easy!");
  return (
    <ErrorBoundary
      // onError={(error) => console.log(error)}
      // onError={notify}
      onReset={() => window.location.replace("/")}
      FallbackComponent={ErrorScreen}
    >
      <App />
    </ErrorBoundary>
  );
};
