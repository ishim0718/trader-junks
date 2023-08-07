import { React, useState } from "react";
import { QUERY_PRODUCTS } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { json } from "react-router-dom";
import ProductList from "./ProductList";


const getFilteredItems = (query, data) => {
  if (!query) {
    return data?.products;
  }
  return data?.products.filter((product) => product?.name.toUpperCase().includes(query?.toUpperCase()));
}
// Child of Nav
const SearchBar = ({keyword, setFilteredItems}) => {
  const [Query, setQuery] = useState("");
  const { data } = useQuery(QUERY_PRODUCTS);
  // Need to pass this to ProductList
  const filteredItems = getFilteredItems(Query, data);
  console.log(`query: ${JSON.stringify(Query)}`)
    return (
      <div>
        <input 
        className="searchBar"
        key="search-bar"
        value={keyword}
        placeholder={"Search Junk"}
        onChange={(e) => setQuery(e.target.value)}
        onInput={(e) => setFilteredItems(filteredItems)}
        />
      </div>
    );
  }
  
  export default SearchBar;