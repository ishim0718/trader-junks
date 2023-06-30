import { React, useState } from "react";

const SearchBar = ({keyword, onChange}) => {
    return (
      <input 
       className="searchBar"
       key="search-bar"
       value={keyword}
       placeholder={"Search Junk"}
       onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  
  export default SearchBar;