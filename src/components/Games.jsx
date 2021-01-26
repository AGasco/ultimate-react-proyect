import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import Searchbar from "./Searchbar";
import axios from "./../axios.js";
import "./../styles/Games.css";
import Sidebar from "./Sidebar";

function Games() {
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [curPlatforms, setCurPlatforms] = useState([1, 2, 3, 4, 5, 7, 8]);
  const [curGenres, setCurGenres] = useState(
    Array.from({ length: 19 }, (_, i) => i + 1)
  );

  useEffect(() => {
    fetchGamesData();
  }, [searchQuery, curPlatforms, curGenres]);

  const fetchGamesData = async () => {
    const query = `/games?page_size=40
      &parent_platforms=${curPlatforms}
      &genres=${curGenres}${searchQuery}`;
    console.log("query", query);
    await axios
      .get(query)
      .then((res) => {
        console.log(res.data.results);
        setGames(res.data.results);
      })
      .catch((err) => console.error(err));
  };

  const handlePlatformsChange = (e) => {
    const platform = e.target.value;
    const checked = e.target.checked;
    let activePlatforms = [...curPlatforms];

    if (checked) {
      activePlatforms.unshift(Number(platform));
      activePlatforms.sort();
    } else {
      activePlatforms = activePlatforms.filter((p) => p != platform);
    }
    setCurPlatforms(activePlatforms);
  };

  const handleGenresChange = (e) => {
    const genre = e.target.value;
    const checked = e.target.checked;
    let activeGenres = [...curGenres];

    if (checked) {
      activeGenres.unshift(Number(genre));
      activeGenres.sort();
    } else {
      activeGenres = activeGenres.filter((g) => g != genre);
    }
    setCurGenres(activeGenres);
  };

  return (
    <div className="games">
      <div className="games__left">
        <Sidebar
          setCurPlatforms={handlePlatformsChange}
          setCurGenres={handleGenresChange}
        />
      </div>
      <div className="games__right">
        <Searchbar setSearchQuery={setSearchQuery} />
        <div className="games__container">
          {games?.map((g) => (
            <GameCard data={g} curPlatforms={curPlatforms} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Games;
