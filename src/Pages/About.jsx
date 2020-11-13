import React, { useState } from "react";
import AboutUs from "../components/AboutUs";
import HowItWorks from "../components/HowItWorks";
import CharitiesSupported from "../components/CharitiesSupported";

function About() {
  const [showComponent, setShowComponent] = useState(<AboutUs />);
  const [activeAboutBtn, setActiveAboutBtn] = useState("about-btn-active");
  const [activehowItWorksBtn, setActivehowItWorksBtn] = useState("");
  const [activeCharitiesBtn, setActiveCharitiesBtn] = useState("");

  function handleClick(event) {
    if (event.target.value === "about-us") {
      setShowComponent(<AboutUs />);
      setActiveAboutBtn("about-btn-active");
      setActivehowItWorksBtn("");
      setActiveCharitiesBtn("");
    }
    if (event.target.value === "howItWorks") {
      setShowComponent(<HowItWorks />);
      setActiveAboutBtn("");
      setActivehowItWorksBtn("about-btn-active");
      setActiveCharitiesBtn("");
    }
    if (event.target.value === "charitiesSupported") {
      setShowComponent(<CharitiesSupported />);
      setActiveAboutBtn("");
      setActivehowItWorksBtn("");
      setActiveCharitiesBtn("about-btn-active");
    }
  }

  return (
    <div className="about-us">
      <h1>
        About <span className="lobster-font">CharityBay</span>
      </h1>
      <div className="about-btns">
        <button
          className={`about-btn ${activeAboutBtn}`}
          value="about-us"
          onClick={handleClick}
        >
          About us
        </button>
        <button
          className={`about-btn ${activehowItWorksBtn}`}
          value="howItWorks"
          onClick={handleClick}
        >
          How it works
        </button>
        <button
          className={`about-btn ${activeCharitiesBtn}`}
          value="charitiesSupported"
          onClick={handleClick}
        >
          Charities
        </button>
      </div>
      <section>{showComponent}</section>
    </div>
  );
}

export default About;
