import React from "react";
import ProductList from "../Components/ProductList"
// import Cart from "../Components/Cart";
import { useQuery } from '@apollo/client'
import { QUERY_PRODUCTS } from "../utils/queries";
import Cart from "../Components/Cart";

const HomePage = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.products|| []

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
      <ProductList 
        products={products}/>
      )}
      <Cart />
    </div>
  );
};

export default HomePage;