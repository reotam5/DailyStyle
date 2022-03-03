import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Drawer from "./components/Drawer";
import Favourites from "./pages/Favourites";
import AddClothes from "./pages/AddClothes";
import ListClothes from "./pages/ListClothes";
import EditClothes from "./pages/EditClothes";
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Favourites" element={<Favourites/>} />
        <Route path="/AddClothes" element={<AddClothes/>} />
        <Route path="/ListClothes" element={<ListClothes/>} />
        <Route path="/EditClothes" element={<EditClothes/>} />
      </Routes>
    </div>
  );
}

export default App;
