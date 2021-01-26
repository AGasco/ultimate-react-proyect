import Landing from "./components/Landing";
import Games from "./components/Games";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Route path="/games">
          <Games />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Router>
    </div>
  );
}

export default App;
