import React, { useState } from "react";
import "./../styles/Searchbar.css";
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
    <div className="searchbar">
      <div className="searchbar__container">
        <form onSubmit={handleSubmit}>
          <FontAwesomeIcon icon={faSearch} />
          <input
            value={search}
            placeholder="Search for games..."
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
