import React from "react";
import "./../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h1>Ultimate Games Display</h1>
      <div className="sidebar__platformsContainer">
        <h4>Platforms</h4>
      </div>
      <div className="sidebar__genresContainer">
        <h4>Genres</h4>
      </div>
      <div className="sidebar__metacriticContainer">
        <h4>Metacritic score</h4>
      </div>
      <div className="sidebar__esrbRatingContainer">
        <h4>ESRB</h4>
      </div>
    </div>
  );
}

export default Sidebar;
