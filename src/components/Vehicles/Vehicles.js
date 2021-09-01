import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import "./Vehicles.css";
const Vehicles = ({ data }) => {
  const history = useHistory();
  const searchVehicle = (name) => {
    history.push(`/search/${name}`);
  };
  return (
    <div className="vehicles">
      <Card style={{ width: "200px", border: "none" }}>
        <Card.Img
          variant="top"
          src={data.imageUrl}
          style={{ width: "70px", margin: "20px 70px" }}
          className="card-image"
        />
        <Card.Body>
          <Card.Title
            className="vehicle-title"
            onClick={() => searchVehicle(data.name)}
          >
            {data.title}
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Vehicles;
