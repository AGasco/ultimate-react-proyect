import React, { useState, useEffect } from "react";
import platformData from "./../data/platforms-data.json";
import "./../styles/Platform.css";

const Platform = ({ id }) => {
  const [curPlatform, setCurPlatform] = useState({});
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const platform = platformData.filter((p) => p.id === id);

    if (platform.length === 0) setHidden(true);
    else setCurPlatform(platform);
  }, [id]);

  return (
    <div className={`platform ${hidden && "hidden"}`}>
      <a href={curPlatform[0]?.url} target="_blank" rel="noreferrer">
        <img
          className={`platform__icon ${
            curPlatform[0]?.name === "Nintendo" && "nintendo"
          }`}
          src={curPlatform[0]?.icon}
          alt={curPlatform[0]?.name + " icon"}
        />
      </a>
    </div>
  );
};

export default Platform;
