import React from "react";
import map from "../../images/Map.png";
import "./SearchResult.css";
import image from "../../images/Frame-1.png";
import people from "../../images/peopleicon.png";

const SearchResult = () => {
  return (
    <div>
      <div className=" container">
        <hr />
        <div className=" search-result d-flex">
          <div className="search-result-box">
            <div className="location shadow p-3">
              <p>Mirpur</p>
              <p>Dhanmondi</p>
            </div>
            <div className="location-info ">
              <img src={image} alt="" />
              <p>Car</p>
              <img src={people} alt="" />
              <p>$ 45</p>
            </div>
          </div>
          <div className="map">
            <img src={map} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
