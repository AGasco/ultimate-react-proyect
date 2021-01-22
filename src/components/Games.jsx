import React, { useState, useEffect } from "react";
import getGames from "./../axios";
import "./../styles/Games.css";

function Games() {
  const [games, setGames] = useState(getGames);

  useEffect(() => {
    console.log("GAMES", games);
  }, []);

  return (
    <div className="games">
      <h1>GAMES</h1>
    </div>
  );
}

export default Games;
