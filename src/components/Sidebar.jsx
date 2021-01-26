import React, { useState, useEffect } from "react";
import platformsData from "./../data/platforms-data.json";
import genresData from "./../data/genres-data.json";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
import "./../styles/Sidebar.css";

const Sidebar = ({ setCurPlatforms, setCurGenres, setCurMetacritic }) => {
  const [metacriticScore, setMetacriticScore] = useState([0, 100]);

  const handleMetacriticChange = (e, newValue) => {
    setMetacriticScore(newValue);
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
            valueLabelDisplay="on"
          />
        </div>
      </div>
      <div className="sidebar__sectionContainer">
        <h4 className="sidebar__subtitle">ESRB</h4>
      </div>
    </div>
  );
};

export default Sidebar;
