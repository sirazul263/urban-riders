import React from "react";
import bg from "../../images/Bg.png";
import Vehicles from "../Vehicles/Vehicles";
import data from "./data.json";
import "./Home.css";
const Home = () => {
  return (
    <div
      className="home"
      //   style={{
      //     backgroundImage: `url(${bg})`,
      //     backgroundRepeat: "no-repeat",

      //     height: "100hv",
      //   }}
    >
      <div className="items">
        {data.map((data) => (
          <Vehicles data={data} key={data.name}></Vehicles>
        ))}
      </div>
    </div>
  );
};

export default Home;
