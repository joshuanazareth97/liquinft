import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeList } from "routes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routeList.map(({ Component, ...route }) => {
          console.log(route);
          return <Route path={route.url} element={<Component />} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
