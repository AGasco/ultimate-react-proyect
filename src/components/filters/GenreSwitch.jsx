import React from "react";
import Switch from "@material-ui/core/Switch";

function GenreSwitch({ genre, setCurGenres }) {
  return (
    <div>
      <li key={genre.id}>
        <Switch value={genre.id} onChange={setCurGenres} defaultChecked />
        <p>{genre.name}</p>
      </li>
    </div>
  );
}

export default GenreSwitch;
