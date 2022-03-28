import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Drawer from "./components/CustomDrawer";
import Favourite from "./pages/Favourites";
import EditCloth from "./pages/EditCloth";
import ListClothes from "./pages/ListClothes";
import AddNewClothes from "./pages/AddClothes";
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./lib/constant";

function App() {
  const [theme, setTheme] = React.useState(lightTheme);
  const toggleTheme = () => {
    setTheme(theme.palette.mode === "light" ? darkTheme : lightTheme);
  };
  document.body.style = "background-color: " + theme.palette.background.default;
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Drawer toggleTheme={toggleTheme} setTheme={setTheme}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favourites" element={<Favourite/>} />
        <Route path="/AddClothes" element={<AddNewClothes/>} />
        <Route path="/ListClothes" element={<ListClothes/>} />
        <Route path="/EditCloth/:id" element={<EditCloth/>} />
        <Route path="/EditCloth" element={<EditCloth/>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
