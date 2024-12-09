import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { login } from "../../../redux/actions/accountActions";
import { setError } from "../../../redux/actions/errorActions";
import { useAuth } from "../../../Context";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (identifier, password) => {
    setLoading(true);
    dispatch(setError("")); 

    try {
      const queryParam = identifier.includes("@")
        ? `email=${identifier}`
        : `username=${identifier}`;
      const response = await fetch(`http://localhost:5001/users?${queryParam}`);

      if (!response.ok) {
        throw new Error("Login failed, please try again.");
      }

      const users = await response.json();

      console.log("Users fetched from server:", users);

      if (!users.length) {
        throw new Error("No users found with the provided identifier.");
      }

      const user = users.find((u) => {
        if (!u.password) {
          console.error("User object is missing a password field", u);
          return false;
        }
        return bcrypt.compareSync(password, u.password);
      });

      if (!user) {
        console.log("No matching user found:", users);
        throw new Error("Invalid username/email or password");
      }

      console.log("Authenticated user:", user);
      dispatch(login(user));
      loginContext(user);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setError(error.message || "An unexpected error occurred.")); // Устанавливаем ошибку в Redux
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

export default LogIn;
