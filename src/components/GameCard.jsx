import React, { useState, useEffect } from "react";
import Platform from "./Platform";
import "./../styles/GameCard.css";

function GameCard({ data }) {
  return (
    <div className="gameCard">
      <img src={data.background_image} alt="" />
      <div className="gameCard__bottom">
        <h3 className="gameCard__title">{data.name}</h3>
        <div className="gameCard__platforms">
          {data.parent_platforms.map((p) => (
            <Platform id={p.platform.id} />
          ))}
        </div>
        <div className="gameCard__footer"></div>
      </div>
    </div>
  );
}

export default GameCard;
