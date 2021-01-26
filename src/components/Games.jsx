import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import axios from "./../axios.js";
import "./../styles/Games.css";

function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGamesData();
  }, []);

  const fetchGamesData = async () => {
    await axios
      .get("/games?page_size=40")
      .then((res) => {
        console.log(res.data.results);
        setGames(res.data.results);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="games">
      {/* <h1>GAMES</h1> */}
      <div className="games__container">
        {games?.map((g) => (
          <GameCard data={g} />
        ))}
      </div>
    </div>
  );
}

export default Games;
