import Landing from "./Landing";
import Games from "./Games";
import Signup from "./Signup";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  // auth.createUserWithEmailAndPassword("abc@abc.com", "123456123456");

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/games">
            <Games />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
