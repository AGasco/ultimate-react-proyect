import React, { useState, useEffect } from "react";
import { setUser } from "../../redux/authActions";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { connect } from "react-redux";

const Login = ({ history, setUser }) => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [setUser]);

  const login = async (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const handleSubmit = async (e) => {
    const { email, password } = formInput;
    e.preventDefault();

    try {
      setError("");
      await login(email, password);
      history.push("/games");
    } catch {
      setError("Failed to log in");
    }
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    setFormInput({
      ...formInput,
      [inputName]: e.target.value,
    });
  };

  return (
    <div className="login">
      <h1 className="login__goBack">
        <Link to="/games">THE ULTIMATE GAMES DISPLAY</Link>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={`login__errorContainer ${!error && "disabled"}`}>
          {error}
        </div>
        <div className="login__inputContainer">
          <label htmlFor="email">e-mail</label>
          <input
            type="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
          />
        </div>

        <div className="login__inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formInput.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Log In</button>
      </form>
      <div className="login__redirect">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(Login);
