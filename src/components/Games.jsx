import React, { useState, useEffect } from "react";
import GameCard from "./GameCard";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";
import axios from "./../axios.js";
import "./../styles/Games.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  fetchDataBegin,
  fetchDataSuccess,
  fetchDataFail,
} from "../redux/fetchActions";
import {
  setSearchQuery,
  setPlatforms,
  setMetacritic,
  setReleaseDate,
  setPage,
  setOrderBy,
  setGenres,
} from "../redux/gamesActions";
import { connect } from "react-redux";

function Games({
  //REDUX:Fetch
  games,
  loading,
  fetchBegin,
  fetchSuccess,
  fetchFail,
  //REDUX:Games
  searchQuery,
  curPlatforms,
  curMetacritic,
  curReleaseDate,
  curPage,
  curOrderBy,
  curGenres,
  setSearchQuery,
  setPlatforms,
  setMetacritic,
  setReleaseDate,
  setPage,
  setOrderBy,
  setGenres,
}) {
  useEffect(() => {
    console.log("searchQuery", searchQuery);
    //Building query
    let query = `/games?page_size=40`;
    if (searchQuery) query = query.concat(`&search_exact=true${searchQuery}`);
    if (curReleaseDate != "1970-01-01,2021-12-31")
      query = query.concat(`&dates=${curReleaseDate}`);
    if (curPage != 1) query = query.concat(`&page=${curPage}`);
    if (curOrderBy !== "") query = query.concat(`&ordering=${curOrderBy}`);
    if (curGenres && curGenres.length < 19)
      query = query.concat(`&genres=${curGenres}`);
    query = query.concat(`&metacritic=${curMetacritic[0]},${curMetacritic[1]}`);
    query = query.concat(`&parent_platforms=${curPlatforms}`);
    console.log("query", query);

    fetchGamesData(query);
  }, [
    searchQuery,
    curPlatforms,
    curGenres,
    curMetacritic,
    curReleaseDate,
    curPage,
    curOrderBy,
  ]);

  //Fetching
  const fetchGamesData = async (query) => {
    fetchBegin();
    await axios
      .get(query)
      .then((res) => {
        console.log("fetchSuccess", res.data);
        fetchSuccess(res.data.results);
      })
      .catch((err) => {
        fetchFail(err);
        console.error(err);
      });
  };

  //Handling filters change
  const handleSearchQueryChange = (query) => {
    console.log("handling search change", query);
    setSearchQuery(query);
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
    setPlatforms(activePlatforms);
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
    setGenres(activeGenres);
  };

  const handleMetacriticChange = (e, newValue) => {
    setMetacritic(newValue);
  };

  const handleReleaseDateChange = (newValue) => {
    const fromYear = newValue[0].toString();
    const toYear = newValue[1].toString();
    setReleaseDate(`${fromYear}-01-01,${toYear}-12-31`);
  };

  const handlePageClick = (dir) => {
    if (dir === "prev" && curPage > 1) {
      setPage(curPage - 1);
    } else if (dir === "next") {
      setPage(curPage + 1);
    } else console.error("Wrong direction inputted");
  };

  const handleOrderByChange = (orderBy) => {
    console.log("changing orderBy", orderBy);
    switch (orderBy) {
      case "name":
        if (curOrderBy === "name") setOrderBy("-name");
        else setOrderBy("name");
        break;
      case "released":
        if (curOrderBy === "released") setOrderBy("-released");
        else setOrderBy("released");
        break;
      case "metacritic":
        if (curOrderBy === "-metacritic") setOrderBy("metacritic");
        else setOrderBy("-metacritic");
        break;
      default:
        setOrderBy("");
        break;
    }
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
          setCurOrderBy={handleOrderByChange}
        />
      </div>
      {loading ? (
        <div className="games__right loading">
          <h1 className="games__loading">Loading...</h1>
        </div>
      ) : (
        <div className="games__right">
          <Searchbar setSearchQuery={handleSearchQueryChange} />
          <div className="games__container">
            {games?.map((g) => (
              <GameCard key={g.id} data={g} curPlatforms={curPlatforms} />
            ))}
          </div>
          <div className="games__pageBtns">
            <button
              className="games__previousBtn"
              onClick={() => handlePageClick("prev")}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              className="games__nextBtn"
              onClick={() => handlePageClick("next")}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    games: state.fetch.games,
    loading: state.fetch.loading,
    searchQuery: state.games.query,
    curPlatforms: state.games.platforms,
    curMetacritic: state.games.metacritic,
    curReleaseDate: state.games.releaseDate,
    curPage: state.games.page,
    curOrderBy: state.games.orderBy,
    curGenres: state.games.genres,
  };
};

const mapDispatchToProps = {
  fetchBegin: fetchDataBegin,
  fetchSuccess: fetchDataSuccess,
  fetchFail: fetchDataFail,
  setSearchQuery,
  setPlatforms,
  setMetacritic,
  setReleaseDate,
  setPage,
  setOrderBy,
  setGenres,
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
