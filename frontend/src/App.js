import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Drawer from "./components/Drawer";
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Drawer/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Favourites" element={<Favourite/>} />
        <Route path="/AddNewClothes" element={<AddNewClothes/>} />
        <Route path="/ListOfClothes" element={<ListNewClothes/>} />
        <Route path="/EditClothes" element={<EditClothes/>} />

      </Routes>
    </div>
  );
}

export default App;
