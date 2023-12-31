import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Library from "../library/library";
import Feed from "../feed/feed";
import Trending from "../trending/trending";
import Player from "../player/player";
import Favourites from "../favourites/favourites";
import "./home.css";
import Sidebar from "../../components/sidebar/sidebar";
import Login from "../auth/login";
import { setClientToken } from "../../spotify";

export default function Home() {
  const [token, setToken] = useState("");

  //window.location.hash gives the access token from the browser url
  //split it based on &, take first element from array to get accessToken
  //accessToken looks like accessToken = sadfada
  //split based on '=' and take first index to get access token
  //store in local storage with key of token
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const accessToken = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", accessToken);
      setToken(accessToken);
      setClientToken(accessToken);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </Router>
  );
}
