import React from "react";
import { Link } from "@reach/router";

const Footer = () => {
  return (
    <footer className="footer-container">
    <Link className="project-title-footer" to="/">
      <h1 className="project-title-footer">CharityBay</h1>
      </Link>
      <Link className="footer-container" to="/about">
        <h3>About us</h3>
      </Link>
    </footer>
  );
};

export default Footer;
