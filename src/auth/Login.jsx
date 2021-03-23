import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Login = ({ history }) => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(history);
  }, []);

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
export default Login;
