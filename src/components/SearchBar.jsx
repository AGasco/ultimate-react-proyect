import React from "react";
import "./../styles/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  return (
    <div className="searchBar">
      <div className="searchBar__container">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" />
      </div>
    </div>
  );
}

export default SearchBar;
