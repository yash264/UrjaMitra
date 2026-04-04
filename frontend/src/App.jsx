import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MapView from "./pages/mapView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/mapView" element={<MapView/>}></Route>
      </Routes>
    </>
  );
}

export default App;
