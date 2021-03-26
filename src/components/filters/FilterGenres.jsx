import React from "react";
import Switch from "@material-ui/core/Switch";

function GenreSwitch({ genresData, setCurGenres, switchSize }) {
  return (
    <div className="sidebar__sectionContainer genres">
      <h4 className="sidebar__subtitle">Genres</h4>
      <div className="sidebar__genresContainer">
        <ul>
          {genresData.map((g) => (
            <li key={g.id}>
              <Switch
                value={g.id}
                size={switchSize}
                onChange={setCurGenres}
                defaultChecked
              />
              <p>{g.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GenreSwitch;
