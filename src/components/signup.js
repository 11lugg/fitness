import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Error from "./error";

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { registerUser, error } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = psdRef.current.value;
    if (email && password && name) registerUser(email, password, name);
    if (location.state?.from) {
      navigate(location.state.from);
    }
  };

  return (
    <div className="form">
      <h2> New User</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Name" type="name" ref={nameRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        {error && <Error error={error}/>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;