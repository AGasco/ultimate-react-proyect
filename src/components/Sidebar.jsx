import React, { useState, useEffect } from "react";
import platformsData from "./../data/platforms-data.json";
import genresData from "./../data/genres-data.json";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
import "./../styles/Sidebar.css";

const Sidebar = ({
  setCurPlatforms,
  setCurGenres,
  setCurMetacritic,
  setCurReleaseDate,
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

  return (
    <div className="sidebar">
      <h1 className="sidebar__title">The Ultimate Games Display</h1>
      <div className="sidebar__sectionContainer platforms">
        <h4 className="sidebar__subtitle">Platforms</h4>
        <div className="sidebar__platformsContainer">
          <ul>
            {platformsData.map((p) => (
              <li>
                <img
                  className="sidebar__platformIcon"
                  src={p.icon}
                  alt={p.name + "'s logo"}
                />
                {p.name}
                <Switch
                  value={p.id}
                  onChange={setCurPlatforms}
                  defaultChecked
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sidebar__sectionContainer genres">
        <h4 className="sidebar__subtitle">Genres</h4>
        <div className="sidebar__genresContainer">
          <ul>
            {genresData.map((g) => (
              <li>
                <Switch value={g.id} onChange={setCurGenres} defaultChecked />
                <p>{g.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
      <div className="sidebar__sectionContainer">
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
          <button className="sidebar__orderBtn">Name</button>
          <button className="sidebar__orderBtn">Released</button>
          <button className="sidebar__orderBtn">Metacritic</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
