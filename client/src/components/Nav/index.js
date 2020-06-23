import React from "react";
import { Link } from "react-router-dom";
import "./style.css";


function Nav() {
  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/">Google Books</Link>

  <div className="collapse navbar-collapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link className={window.location.pathname === "/" ? "nav-link active" : "nav-link"} to="/">Search</Link>
      </li>
      <li className="nav-item">
        <Link className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"} to="/saved">Saved Books</Link>
      </li>
    </ul>
  </div>
</nav>
  );
}

export default Nav;




