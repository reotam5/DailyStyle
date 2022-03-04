import React from "react";
import { Route, Routes } from "react-router-dom";
import TestingPage from "./components/AddNewClothes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Drawer from "./components/Drawer";
import Favourite from "./pages/Favourites";
import EditCloth from "./pages/EditCloth";
import ListClothes from "./pages/ListClothes";
import AddNewClothes from "./pages/AddClothes";
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <Drawer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Favourites" element={<Favourite/>} />
        <Route path="/AddClothes" element={<AddNewClothes/>} />
        <Route path="/ListClothes" element={<ListClothes/>} />
        <Route path="/EditCloth" element={<EditCloth/>} />
        <Route path="/TestingPage" element={<TestingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
