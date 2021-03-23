import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery;
    const searchThis = query?.slice(query.lastIndexOf("=") + 1);
    setSearch(searchThis);
  }, [searchQuery]);

  const handleSubmit = (e) => {
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
