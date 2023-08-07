import React, { useState } from "react";
import ProductList from "../Components/ProductList"
// import Cart from "../Components/Cart";
import { useQuery } from '@apollo/client'
import { QUERY_PRODUCTS } from "../utils/queries";
import Cart from "../Components/Cart";
import SearchBar from "../Components/SearchBar";

const HomePage = () => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const products = data?.products|| []
  const [filteredItems, setFilteredItems] = useState(products);

  return (
    <div className="container">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1><SearchBar setFilteredItems={setFilteredItems}/> </h1>
          <ProductList products={filteredItems}/>
      </div>
      )}
      <Cart />
    </div>
  );
};

export default HomePage;