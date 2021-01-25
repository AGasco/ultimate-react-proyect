import React, { useState, useEffect } from "react";
import Platform from "./Platform";
import ESRBRatings from "./../data/esrb-ratings.json";
import "./../styles/GameCard.css";

function GameCard({ data }) {
  const [gameData, setGameData] = useState({
    name: "",
    picture: "",
    metacritic: "",
    platforms: [],
    esrb: "",
  });

  useEffect(() => {
    console.log("esrb", data.esrb_rating);

    setGameData({
      ...gameData,
      name: data.name,
      picture: data.background_image,
      metacritic: data.metacritic,
      platforms: data.parent_platforms,
      esrb: data.esrb_rating,
    });
  }, [data]);

  const getESRBIcon = (id) => {
    if (id) {
      const esrb = ESRBRatings.filter((r) => r.id === id);
      console.log("id", id);
      console.log("esbr", esrb);
      if (esrb.length > 0) {
        console.log("returning", esrb.icon);
        return esrb[0].icon;
      }
    }
    return "";
  };

  return (
    <div className={`gameCard ${!gameData.picture && "hidden"}`}>
      <img
        className="gameCard__img"
        src={gameData.picture}
        alt={gameData.name + "'s Picture"}
      />
      <div className="gameCard__bottom">
        <h3 className="gameCard__title">{gameData.name}</h3>
        <div className="gameCard__platforms">
          {gameData.platforms.map((p) => (
            <Platform id={p.platform.id} />
          ))}
        </div>
      </div>
      <div className="gameCard__metacritic">
        <p
          className={
            gameData.metacritic >= 75
              ? "green"
              : gameData.metacritic >= 50
              ? "yellow"
              : gameData.metacritic > 0
              ? "red"
              : "hidden"
          }
        >
          {gameData.metacritic}
        </p>
      </div>
      <div className={`gameCard__ageRating ${!gameData.esrb && "hidden"}`}>
        <a
          href="https://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board"
          target="_blank"
        >
          <img
            src={getESRBIcon(gameData.esrb?.id)}
            alt={gameData.esrb?.name + "'s icon"}
          />
        </a>
      </div>
    </div>
  );
}

export default GameCard;
