import React, { useEffect } from "react";
import { setUser } from "./../redux/authActions";
import { auth } from "./../firebase";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function LoginUI({ user, setUser }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [setUser]);

  const logout = () => {
    auth.signOut();
  };

  return (
    <div className="loginUI">
      {!user ? (
        <Link to="/login">
          <button>Login </button>
        </Link>
      ) : (
        <div className="loginUI__logout">
          <p>Hi, {user.email}</p>
          <button className="loginUI__logoutBtn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginUI);
