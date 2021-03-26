import React, { useState, useEffect } from "react";
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

  const [switchSize, setSwitchSize] = useState("medium");

  useEffect(() => {
    if (window.innerWidth <= 540) setSwitchSize("small");
    else setSwitchSize("medium");
  }, [window.innnerWidth]);

  return (
    <div className="sidebar">
      <h1 className="sidebar__title" onClick={resetFilters}>
        THE ULTIMATE GAMES DISPLAY
      </h1>
      <FilterPlatforms
        platformsData={platformsData}
        setCurPlatforms={setCurPlatforms}
        switchSize={switchSize}
      />
      <FilterGenres
        genresData={genresData}
        setCurGenres={setCurGenres}
        switchSize={switchSize}
      />
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
