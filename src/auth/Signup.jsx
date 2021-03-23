import React, { useState, useEffect } from "react";
import { setUser } from "./../redux/authActions";
import { auth } from "./../firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const handleSubmit = async (e) => {
    const { email, password, passwordConfirm } = formInput;
    e.preventDefault();

    // handling corner cases
    if (password !== passwordConfirm) return setError("Passwords do not match");
    if (password.length < 6)
      return setError("Password needs to have a minimum of 6 characters");

    try {
      setError("");
      setLoading(true);
      await signup(email, password);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    setFormInput({
      ...formInput,
      [inputName]: e.target.value,
    });
  };

  return (
    <div className="signup">
      <h1>Create your account</h1>
      <form onSubmit={handleSubmit}>
        <div className={`signup__errorContainer ${!error && "disabled"}`}>
          {error}
        </div>
        <div className="signup__inputContainer">
          <label htmlFor="email">e-mail</label>
          <input
            type="email"
            name="email"
            value={formInput.email}
            onChange={handleChange}
          />
        </div>

        <div className="signup__inputContainer">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formInput.password}
            onChange={handleChange}
          />
        </div>

        <div className="signup__inputContainer">
          <label htmlFor="passwordConfirm">Password Confirmation</label>
          <input
            type="password"
            name="passwordConfirm"
            value={formInput.passwordConfirm}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      <div className="signup__redirect">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(Signup);
