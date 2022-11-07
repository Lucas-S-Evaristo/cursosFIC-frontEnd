import React from "react";
import Button from "@mui/material/Button";

import "./hm.css";
function Home() {
  return (
    <div className="divHome">
      <header className="headHome">
        <img
          src={require("./logoSenaiOrigin.png")}
          width="150"
          className="logoHome"
        />
        <button
        className="btLoginH"
        >LOGIN</button>
      </header>
      
    </div>
  );
}

export default Home;
