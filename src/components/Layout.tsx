import React, { FC, ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
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
