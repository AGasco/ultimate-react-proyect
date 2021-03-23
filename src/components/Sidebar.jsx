import React, { useState } from "react";
import platformsData from "./../data/platforms-data.json";
import genresData from "./../data/genres-data.json";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import FilterPlatforms from "./filters/FilterPlatforms";
import FilterGenres from "./filters/FilterGenres";

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

  const handleMetacriticChange = (e, newValue) => {
    setMetacriticScore(newValue);
  };

  const handleReleaseChange = (e, minMax) => {
    const newReleaseDate = [...releaseDate];
    const value = Number(e.target.value);
    switch (minMax) {
      case "min":
        newReleaseDate[0] = value;
        break;
      case "max":
        newReleaseDate[1] = value;
        break;
      default:
        break;
    }
    setReleaseDate(newReleaseDate);
  };

  const handleReleaseSubmit = (e) => {
    e.preventDefault();
    setCurReleaseDate(releaseDate);
  };

  //Dynamic UI
  const setUpOrderButton = (name) => {
    return (
      <button onClick={() => setCurOrderBy(name)} className="sidebar__orderBtn">
        {setUpOrderIcon(name)}
        {name[0].toUpperCase() + name.slice(1)}
      </button>
    );
  };

  //Dynamic UI
  const setUpOrderIcon = (name) => {
    if (curOrderBy?.includes(name)) {
      if (curOrderBy[0] === "-") return <FontAwesomeIcon icon={faArrowDown} />;
      else return <FontAwesomeIcon icon={faArrowUp} />;
    }
  };

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
      <div className="sidebar__sectionContainer metacritic">
        <h4 className="sidebar__subtitle">Metacritic score</h4>
        <div className="sidebar__metacriticContainer">
          <Slider
            value={metacriticScore}
            onChange={handleMetacriticChange}
            onChangeCommitted={setCurMetacritic}
            min={10}
            valueLabelDisplay="on"
          />
        </div>
      </div>
      <div className="sidebar__sectionContainer released">
        <h4 className="sidebar__subtitle">Release Year</h4>
        <div className="sidebar__releaseContainer">
          <div className="sidebar__inputContainer">
            <form onSubmit={handleReleaseSubmit}>
              <label htmlFor="sidebar__releaseMin">From:</label>
              <input
                className="sidebar__releaseMin"
                onChange={(e) => handleReleaseChange(e, "min")}
                value={Number(releaseDate[0]).toString()}
                type="number"
                min={1970}
                max={releaseDate[1] - 1}
              />
            </form>
          </div>

          <div className="sidebar__inputContainer">
            <form onSubmit={handleReleaseSubmit}>
              <label htmlFor="sidebar__releaseMax">To:</label>
              <input
                className="sidebar__releaseMax"
                onChange={(e) => handleReleaseChange(e, "max")}
                value={releaseDate[1].toString()}
                type="number"
                min={releaseDate[0] + 1}
                max={2021}
              />
            </form>
          </div>
        </div>
      </div>
      <div className="sidebar__sectionContainer orderBy">
        <h4 className="sidebar__subtitle">Order by</h4>
        <div className="sidebar__orderByContainer">
          {setUpOrderButton("name")}
          {setUpOrderButton("released")}
          {setUpOrderButton("metacritic")}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
