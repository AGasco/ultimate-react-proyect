import React, { useState, useEffect } from "react";
import Landing from "./Landing";
import Games from "./Games";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  //Checking if it's mobile or desktop to render different components
  useEffect(() => {
    setIsMobile(screenWidth <= 900);
  }, [screenWidth]);

  useEffect(() => {
    console.log("isMobile", isMobile);
  }, [isMobile]);

  useEffect(() => {
    console.log("inside useEffect");
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/games" component={Games} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            exact
            path="/"
            render={() => <Landing isMobile={isMobile} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
