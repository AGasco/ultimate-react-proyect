import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Landing = ({ isMobile }) => {
  const history = useHistory();
  const pressedF = useKeyPress("f");

  useEffect(() => {
    if (pressedF) history.push("/games");
  }, [pressedF, history]);

  return (
    <div className="landing">
      <div className="landing__titleContainer">
        <h1 className="landing__title">WELCOME</h1>
        <h3 className="landing__subtitle">to the Ultimage Games Display</h3>
      </div>

      {isMobile ? (
        <p className="landing__prompt" onClick={() => history.push("/games")}>
          Click to proceed
        </p>
      ) : (
        <p className="landing__prompt">Press 'F' to proceed</p>
      )}
    </div>
  );
};

//Hook to grab keypress
const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }) {
    if (key === targetKey) setKeyPressed(true);
  }

  function upHandler({ key }) {
    if (key === targetKey) setKeyPressed(false);
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  return keyPressed;
};

export default Landing;
