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
  const [curMetacritic, setCurMetacritic] = useState([0, 100]);
  const [curReleaseDate, setCurReleaseDate] = useState("1970-01-01,2021-12-31");

  useEffect(() => {
    fetchGamesData();
  }, [searchQuery, curPlatforms, curGenres, curMetacritic, curReleaseDate]);

  const fetchGamesData = async () => {
    const query = `/games?page_size=40
      &search_exact=true${searchQuery}
      &parent_platforms=${curPlatforms}
      &genres=${curGenres}
      &metacritic=${curMetacritic[0]},${curMetacritic[1]}
      &dates=${curReleaseDate}`;
    console.log("query", query);
    await axios
      .get(query)
      .then((res) => {
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

  const handleMetacriticChange = (e, newValue) => {
    //default
    console.log("newValue", newValue);
    if (newValue.includes(10) && newValue.includes(100))
      setCurMetacritic([0, 100]);
    else setCurMetacritic(newValue);
  };

  const handleReleaseDateChange = (newValue) => {
    const fromYear = newValue[0].toString();
    const toYear = newValue[1].toString();
    setCurReleaseDate(`${fromYear}-01-01,${toYear}-12-31`);
  };

  return (
    <div className="games">
      <div className="games__left">
        <Sidebar
          setCurPlatforms={handlePlatformsChange}
          setCurGenres={handleGenresChange}
          curMetacritic={curMetacritic}
          setCurMetacritic={handleMetacriticChange}
          setCurReleaseDate={handleReleaseDateChange}
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
