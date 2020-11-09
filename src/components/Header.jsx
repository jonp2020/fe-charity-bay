import React, { Component } from "react";
import { Link } from "@reach/router";


class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link className="header" to="/">
        <h1>CharityBay</h1>
        </Link>
      </header>
    );
  }
}

export default Header;
