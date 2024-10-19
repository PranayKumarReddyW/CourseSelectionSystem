import React from "react";
import NavbarMenu from "./Navbar";
const Layout = ({ children }) => {
  return (
    <div>
      <NavbarMenu />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
