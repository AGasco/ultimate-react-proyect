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
import { connect } from "react-redux";

function Games({ games, loading, fetchBegin, fetchSuccess, fetchFail }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [curPlatforms, setCurPlatforms] = useState([1, 2, 3, 4, 5, 7, 8]);
  const [curMetacritic, setCurMetacritic] = useState([10, 100]);
  const [curReleaseDate, setCurReleaseDate] = useState("1970-01-01,2021-12-31");
  const [curPage, setCurPage] = useState(1);
  const [curOrderBy, setCurOrderBy] = useState("");
  const [curGenres, setCurGenres] = useState(
    Array.from({ length: 19 }, (_, i) => i + 1)
  );

  useEffect(() => {
    //Building query
    let query = `/games?page_size=40`;
    if (searchQuery != "")
      query = query.concat(`&search_exact=true${searchQuery}`);
    if (curReleaseDate != "1970-01-01,2021-12-31")
      query = query.concat(`&dates=${curReleaseDate}`);
    if (curPage != 1) query = query.concat(`&page=${curPage}`);
    if (curOrderBy !== "") query = query.concat(`&ordering=${curOrderBy}`);
    query = query.concat(`&metacritic=${curMetacritic[0]},${curMetacritic[1]}`);
    query = query.concat(
      `&parent_platforms=${curPlatforms}&genres=${curGenres}`
    );
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

  const fetchGamesData = async (query) => {
    fetchBegin();
    await axios
      .get(query)
      .then((res) => {
        fetchSuccess(res.data.results);
      })
      .catch((err) => {
        fetchFail(err);
        console.error(err);
      });
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
    // if (newValue.includes(10) && newValue.includes(100))
    //   setCurMetacritic([0, 100]);
    setCurMetacritic(newValue);
  };

  const handleReleaseDateChange = (newValue) => {
    const fromYear = newValue[0].toString();
    const toYear = newValue[1].toString();
    setCurReleaseDate(`${fromYear}-01-01,${toYear}-12-31`);
  };

  const handlePageClick = (dir) => {
    if (dir === "prev" && curPage > 1) {
      setCurPage(curPage - 1);
    } else if (dir === "next") {
      setCurPage(curPage + 1);
    } else console.error("Wrong direction inputted");
  };

  const handleOrderByChange = (orderBy) => {
    console.log("changing orderBy", orderBy);
    switch (orderBy) {
      case "name":
        if (curOrderBy === "name") setCurOrderBy("-name");
        else setCurOrderBy("name");
        break;
      case "released":
        if (curOrderBy === "released") setCurOrderBy("-released");
        else setCurOrderBy("released");
        break;
      case "metacritic":
        if (curOrderBy === "-metacritic") setCurOrderBy("metacritic");
        else setCurOrderBy("-metacritic");
        break;
      default:
        setCurOrderBy("");
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
        <div className="games__right">
          <h1 className="games__loading">Loading...</h1>
        </div>
      ) : (
        <div className="games__right">
          <Searchbar setSearchQuery={setSearchQuery} />
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
    games: state.games,
    loading: state.loading,
  };
};

const mapDispatchToProps = {
  fetchBegin: fetchDataBegin,
  fetchSuccess: fetchDataSuccess,
  fetchFail: fetchDataFail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Games);
