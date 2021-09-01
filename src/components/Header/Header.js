import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Header.css";
const Header = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <div className="nav-container">
      <div className="wrapper">
        <nav>
          <div className="nav-brand">
            <p>Urban Riders</p>
          </div>
          <ul className="nav-items">
            <li>
              <Link to="/home" className="link">
                {" "}
                Home
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/destination" className="link">
                {" "}
                Destination
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/blog" className="link">
                {" "}
                Blog
              </Link>{" "}
            </li>
            <li>
              <Link to="/contract" className="link">
                {" "}
                Contract
              </Link>{" "}
            </li>
            <li>
              {user.email ? (
                `${user.name}`
              ) : (
                <Link to="/login" className="link login-btn">
                  {" "}
                  Log in{" "}
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
