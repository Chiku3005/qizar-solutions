import React from "react";
import "./Navbar.css";
import logo from "../../assets/logos/logo.png";

function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
  <img src={logo} alt="Qizar Solutions Logo" />
</div>

      <nav>
       <ul className="nav-links">
  <li><a href="#home">Home</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#services">Services</a></li>
  <li><a href="#products">Products</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
      </nav>

      <button className="nav-button">
        Get Started
      </button>

    </header>
  );
}

export default Navbar;