import React from "react";
import Switch from "@material-ui/core/Switch";

function FilterPlatforms({ platformsData, setCurPlatforms, switchSize }) {
  return (
    <div className="sidebar__sectionContainer platforms">
      <h4 className="sidebar__subtitle">Platforms</h4>
      <div className="sidebar__platformsContainer">
        <ul>
          {platformsData.map((p) => (
            <li key={p.name}>
              <img
                className="sidebar__platformIcon"
                src={p.icon}
                alt={p.name + "'s logo"}
              />
              {p.name}
              <Switch
                value={p.id}
                size={switchSize}
                onChange={setCurPlatforms}
                defaultChecked
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FilterPlatforms;
