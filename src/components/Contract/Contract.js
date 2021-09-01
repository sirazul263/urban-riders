import React from "react";
import { useContext } from "react";
import { UserContext } from "../../App";

const Contract = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <div>
      <h2>Contract: {user.name}</h2>
    </div>
  );
};

export default Contract;
