import React from "react";
import ProductList from "../Components/ProductList";
import Cart from "../components/Cart";

const HomePage = () => {
  return (
    <div className="container">
      <ProductList />
      <Cart />
    </div>
  );
};

export default HomePage;