import React from "react";
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            Mid Project
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/'} className="nav-link active pe-4" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/cards'} className="nav-link active pe-4" aria-current="page" >
                  Cards
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active pe-4" aria-current="page" to={"/postcards"}>
                  Post Cards
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link active pe-4" aria-current="page" href="#">
                  Contact Us
                </a>
              </li>
              
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
