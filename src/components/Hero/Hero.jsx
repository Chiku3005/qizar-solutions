import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">

        <span className="hero-tag">
          Welcome to Qizar Solutions
        </span>

        <h1>
          Transforming Ideas into <span>Digital Solutions</span>
        </h1>

        <p>
          We provide innovative software development,
          AI solutions, cloud services, and digital
          transformation to help businesses grow.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Explore Services
          </button>
        </div>

        <div className="hero-stats">

          <div>
            <h2>100+</h2>
            <p>Projects</p>
          </div>

          <div>
            <h2>50+</h2>
            <p>Clients</p>
          </div>

          <div>
            <h2>24/7</h2>
            <p>Support</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;