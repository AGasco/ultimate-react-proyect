import React from "react";

function FilterYear({ releaseDate, setReleaseDate, setCurReleaseDate }) {
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
  );
}

export default FilterYear;
