import React, { useState, useEffect } from "react";
import Platform from "./Platform";
import ESRBRatings from "./../data/esrb-ratings.json";
import Modal from "react-modal";
import ReactPlayer from "react-player/youtube";
import "./../styles/GameCard.css";

Modal.setAppElement("#root");

function GameCard({ data, curPlatforms }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [gameData, setGameData] = useState({
    name: "",
    picture: "",
    metacritic: "",
    platforms: [],
    esrb: "",
    video: "",
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setGameData({
      ...gameData,
      name: data.name,
      picture: data.background_image,
      metacritic: data.metacritic,
      platforms: data.parent_platforms,
      esrb: data.esrb_rating,
      video: data.clip?.video,
    });
  }, [data]);

  const getESRBIcon = (id) => {
    if (id) {
      const esrb = ESRBRatings.filter((r) => r.id === id);
      if (esrb.length > 0) {
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
        onClick={openModal}
      />
      <div className="gameCard__bottom">
        <h3 className="gameCard__title">{gameData.name}</h3>
        <div className="gameCard__platforms">
          {gameData.platforms?.map((p) => {
            if (curPlatforms.includes(p.platform.id))
              return <Platform id={p.platform.id} />;
          })}
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
      <Modal isOpen={modalOpen} onRequestClose={closeModal}>
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          controls={true}
          playing={true}
          url={`https://youtu.be/${gameData.video}`}
        />
      </Modal>
    </div>
  );
}

export default GameCard;
