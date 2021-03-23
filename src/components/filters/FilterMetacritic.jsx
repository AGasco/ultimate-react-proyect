import React from "react";
import Slider from "@material-ui/core/Slider";

function FilterMetacritic({
  metacriticScore,
  setMetacriticScore,
  setCurMetacritic,
}) {
  const handleMetacriticChange = (e, newValue) => {
    setMetacriticScore(newValue);
  };

  return (
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
  );
}

export default FilterMetacritic;
