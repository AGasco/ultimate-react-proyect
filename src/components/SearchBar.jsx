import React, { useState } from "react";
import "./../styles/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ setSearchQuery }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("handlingSubmit");
    e.preventDefault();
    setSearchQuery(`&search=${search}`);
  };

  return (
    <div className="searchBar">
      <div className="searchBar__container">
        <form onSubmit={handleSubmit}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            value={search}
            onChange={handleChange}
            onSubmit={handleSubmit}
            type="text"
          />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
