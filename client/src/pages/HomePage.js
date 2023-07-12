import React from "react";
import ProductList from "../Components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../Components/Cart";

const HomePage = () => {
  return (
    <div className="container">
      {/* <CategoryMenu /> */}
      <ProductList />
      {/* <Cart /> */}
    </div>
  );
};

export default HomePage;