import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import Searchbar from "./Searchbar";
import axios from "./../axios.js";
import "./../styles/Games.css";
import Sidebar from "./Sidebar";

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
      <div className="games__left">
        <Sidebar />
      </div>
      <div className="games__right">
        <Searchbar setSearchQuery={setSearchQuery} />
        <div className="games__container">
          {games?.map((g) => (
            <GameCard data={g} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;
