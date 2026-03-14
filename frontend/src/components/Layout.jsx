import React from "react";
import { Outlet } from "react-router";
import { Suspense, Lazy } from "react";
const Navbar = Lazy(() => import("./Navbar.jsx"));
function Layout() {
  return (
    <div>
      <Suspense fallback={<div>Navbar Loading..........</div>}>
        <Navbar></Navbar>
      </Suspense>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
