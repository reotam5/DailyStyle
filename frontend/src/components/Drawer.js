import * as React from 'react';
import { useState } from 'react';
import {Link, Route} from "react-router-dom";
import  navIcon  from '../img/icons8-menu-50_1.png'
import { useNavigate } from "react-router-dom";

const Drawer = () => {
  let navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  // const handleToggle = () => {
  //   drawerClose(prev => !prev)
  // }

  return (
      // <nav className='Drawer' className='container flex justify-left mx-auto bg-white'>
      //   <button onClick={handleToggle}> {drawerOpen ? "Close" : "Open" }</button>
      //   <ul className='nav-links'>
      //     <li><Link to='/'>Home</Link></li>
      //     <li><Link to='/Favourites'>Favourites</Link></li>
      //     <li><Link to='/AddClothes'>Add New Clothing</Link></li>
      //     <li><Link to='/ListClothes'>List of Your Clothes</Link></li> 
      //   </ul>
      // </nav>

      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3  mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black"
            href="#pablo"
          >
            DailyStyle
          </a>
          <button
            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none invert"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <img src={navIcon} style={{width: "30px", height: "30px"}}/>
          </button>
        </div>
        <div  
          className={
            "lg:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
          id="example-navbar-danger"
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item border-black border-b-2">
              <div
                onClick={()=>{navigate("/")}}
                className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
              >
                <i className="text-lg leading-lg text-black opacity-75"></i><span className="ml-2">Home</span>
              </div>
            </li>
            <li className="nav-item border-b-2 border-black">
              <div
                onClick={()=>{navigate("/Favourites")}}
                className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
              >
                <i className="text-lg leading-lg text-black opacity-75"></i><span className="ml-2">Favourites</span>
              </div>
            </li>
            <li className="nav-item nav-item border-b-2 border-black">
              <div
                onClick={()=>{navigate("/AddClothes")}}
                className="cursor-pointer px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
              >
                <i className="text-lg leading-lg text-black opacity-75"></i><span className="ml-2">Add Clothes</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Drawer





