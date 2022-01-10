import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Error from "./error";

const Signin = () => {
  const emailRef = useRef();
  const psdRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, forgotPassword, error } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = psdRef.current.value;
    if (email && password) signInUser(email, password);
    if (location.state?.from) {
      navigate(location.state.from);
    }
  };

  const forgotPasswordHandler = () => {
    const email = emailRef.current.value;
    if (email)
      forgotPassword(email).then(() => {
        emailRef.current.value = "";
      });
  };

  return (
    <div className="form">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        {error && <Error error={error}/>}
        <button type="submit">Sign In</button>
        <p onClick={forgotPasswordHandler}>Forgot Password?</p>
      </form>
    </div>
  );
};

export default Signin;