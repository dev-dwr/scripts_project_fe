import React from "react";
import Head  from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const DefaultLayout = ({children}) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
