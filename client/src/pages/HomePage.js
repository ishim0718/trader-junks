import React from "react";
import ProductItem from "../Components/ProductItem";
import ProductList from "../Components/ProductList"
// import Cart from "../Components/Cart";

const HomePage = () => {
  return (
    <div className="container">
      <ProductList />
      {/* <Cart /> */}
    </div>
  );
};

export default HomePage;