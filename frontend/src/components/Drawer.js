import * as React from 'react';
import { useState } from 'react';
import {Link} from "react-router-dom";

const [drawerOpen, drawerClose] = useState(false)

const handleToggle = () => {
  drawerClose(prev => !prev)
}

const Drawer = () => {
  return (
      <Drawer className='Drawer'>
        <button onClick={handleToggle}> {drawerOpen ? "Close" : "Open" }</button>
        <ul className='nav-links'>
          <Link to='/' className='Home'/>
          <li>Home</li>
          <Link to='/Favourites' className='Favourites'/>
          <li>Favourites Outfits</li>
          <Link to='/AddClothes' className='AddClothes'/>
          <li>Add New Clothes</li>
          <Link to='/ListClothes' className='ListClothes'/>
          <li>List of Your Clothes</li>
          <Link to='/EditOutfits' className='EditOutfits'/>
          <li>Edit Clothing</li>
        </ul>
      </Drawer>
  )
}

export default Drawer



  

