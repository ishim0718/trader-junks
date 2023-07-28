import { React, useState } from "react";
import { QUERY_PRODUCTS } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { json } from "react-router-dom";
import ProductList from "./ProductList";


const getFilteredItems = (query, data) => {
  if (!query) {
    return data?.products;
  }
  return data?.products.filter((product) => product?.name.toUpperCase().startsWith(query?.toUpperCase()));
}

const SearchBar = ({keyword}) => {
  const [Query, setQuery] = useState("");
  const { data } = useQuery(QUERY_PRODUCTS);
  const filteredItems = getFilteredItems(Query, data);
  console.log(`data: ${JSON.stringify(filteredItems)}`)
    return (
      <input 
       className="searchBar"
       key="search-bar"
       value={keyword}
       placeholder={"Search Junk"}
       onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  
  export default SearchBar;