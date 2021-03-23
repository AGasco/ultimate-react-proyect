import React, { useState } from "react";
import platformsData from "./../data/platforms-data.json";
import genresData from "./../data/genres-data.json";
import FilterPlatforms from "./filters/FilterPlatforms";
import FilterGenres from "./filters/FilterGenres";
import FilterMetacritic from "./filters/FilterMetacritic";
import FilterYear from "./filters/FilterYear";
import OrderBy from "./filters/OrderBy";

const Sidebar = ({
  curOrderBy,
  setCurPlatforms,
  setCurGenres,
  setCurMetacritic,
  setCurReleaseDate,
  setCurOrderBy,
  resetFilters,
}) => {
  const [metacriticScore, setMetacriticScore] = useState([0, 100]);
  const [releaseDate, setReleaseDate] = useState([1970, 2021]);

  return (
    <div className="sidebar">
      <h1 className="sidebar__title" onClick={resetFilters}>
        THE ULTIMATE GAMES DISPLAY
      </h1>
      <FilterPlatforms
        platformsData={platformsData}
        setCurPlatforms={setCurPlatforms}
      />
      <FilterGenres genresData={genresData} setCurGenres={setCurGenres} />
      <FilterMetacritic
        metacriticScore={metacriticScore}
        setMetacriticScore={setMetacriticScore}
        setCurMetacritic={setCurMetacritic}
      />
      <FilterYear
        releaseDate={releaseDate}
        setReleaseDate={setReleaseDate}
        setCurReleaseDate={setCurReleaseDate}
      />
      <OrderBy curOrderBy={curOrderBy} setCurOrderBy={setCurOrderBy} />
    </div>
  );
};

export default Sidebar;
