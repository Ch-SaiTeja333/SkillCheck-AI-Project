import React from 'react'
import {Outlet} from 'react-router';
import Navbar from './Navbar.jsx';
function Layout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  )
}

export default Layout
