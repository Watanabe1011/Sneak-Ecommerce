import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Products from "./container/Products";

const App = () => {
  return (
    <>
      <Navbar />
      <Products />
    </>
  );
};

export default App;
