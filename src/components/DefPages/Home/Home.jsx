import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  loadHomePage,
  unloadHomePage,
} from "../../../redux/actions/homeActions";
import { useAuth } from "../../../Context";
import styles from "./Home.module.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(loadHomePage());

    return () => {
      dispatch(unloadHomePage());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <img src={user?.avatar} alt="User Avatar" className={styles.avatar} />
      <div className={styles.greeting}>Hello {user?.userName}</div>
      <div>Welcome to your personalized TODO list.</div>
      <div className={styles.email}>Your Email Address: {user?.email}</div>
      <div className={styles.registration}>
        Your Time Registration: {user?.createdAd}
      </div>
      <NavLink to="/notes">Go to Notes</NavLink>
    </div>
  );
};

export default Home;
