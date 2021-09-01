import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Search.css";
import map from "../../images/Map.png";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Search = () => {
  const { name } = useParams();
  const [place, setPlace] = useState({});
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    const route = {
      from: data.from,
      to: data.to,
      name: name,
    };
    setPlace(route);
  };
  return (
    <div className=" container">
      <hr />
      <div className=" search-container d-flex">
        <div className="search-box">
          <form onSubmit={handleSubmit(onSubmit)} className="search-form">
            <label htmlFor="from">Pick from</label>
            <br />
            <input
              {...register("from", { required: true })}
              type="text"
              name="from"
            />
            <br />
            <label htmlFor="to">Pick to</label>
            <br />
            <input
              {...register("to", { required: true })}
              type="text"
              name="to"
            />
            <br />
            <Link to="/search-result">
              {" "}
              <input type="submit" className="search-btn" value="Search" />
            </Link>
          </form>
        </div>
        <div className="map">
          <img src={map} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Search;
