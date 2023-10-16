import React from "react";
import Header from "./Header";

export const Layout = ({ children }) => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
