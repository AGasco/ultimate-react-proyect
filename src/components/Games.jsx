import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import SearchBar from "./SearchBar";
import axios from "./../axios.js";
import "./../styles/Games.css";

function Games() {
  const [searchQuery, setSearchQuery] = useState("");
  const [games, setGames] = useState([]);

  useEffect(() => {
    console.log("fetching");
    fetchGamesData();
  }, [searchQuery]);

  const fetchGamesData = async () => {
    await axios
      .get(`/games?page_size=40${searchQuery}`)
      .then((res) => {
        console.log(res.data.results);
        setGames(res.data.results);
      })
      .catch((err) => console.error(err));
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // setSearch(e.target.value);
  };

  return (
    <div className="games">
      {/* <h1>GAMES</h1> */}
      <SearchBar setSearchQuery={setSearchQuery} />
      <div className="games__container">
        {games?.map((g) => (
          <GameCard data={g} />
        ))}
      </div>
    </div>
  );
}

export default Games;
