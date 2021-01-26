import React from "react";
import platformsData from "./../data/platforms-data.json";
import Switch from "@material-ui/core/Switch";
import "./../styles/Sidebar.css";

function Sidebar({ setCurPlatforms }) {
  return (
    <div className="sidebar">
      <h1 className="sidebar__title">The Ultimate Games Display</h1>
      <div className="sidebar__sectionContainer">
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
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sidebar__sectionContainer">
        <h4 className="sidebar__subtitle">Genres</h4>
      </div>
      <div className="sidebar__sectionContainer">
        <h4 className="sidebar__subtitle">Metacritic score</h4>
      </div>
      <div className="sidebar__sectionContainer">
        <h4 className="sidebar__subtitle">ESRB</h4>
      </div>
    </div>
  );
}

export default Sidebar;
