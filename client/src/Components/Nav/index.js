import React from "react";
import Auth from "../../utils/auth";
import { Link, json, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";

function Nav() {
  const getFilteredItems = (filteredItems) => {
    console.log(`The value of this is: ${JSON.stringify(filteredItems)}`)
    return filteredItems;
  }
  
  const location = useLocation();

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row navbar">
          <li className="mx-1">
            <Link to="/account">
              Account
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row navbar">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  if (location.pathname === "/") {
    return (
      <header className="flex-row px-1">
        <h1>
          <Link to="/">
            <span role="img" aria-label="shopping bag" className="trashcan">🗑️</span>
            Trader Junks
          </Link>
        </h1>
        <nav>
          {showNavigation()}
        </nav>
      </header>
    );
  } else {
    return (
      <header className="flex-row px-1">
        <h1>
          <Link to="/">
            <span role="img" aria-label="shopping bag" className="trashcan">🗑️</span>
            Trader Junks
          </Link>
        </h1>
        <nav>
          {showNavigation()}
        </nav>
      </header>
    );
  }
}

export default Nav;
