import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import './index.css';

function App() {
  return (
    <div>
      <h1>put universal framing here</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
